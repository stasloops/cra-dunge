import React, { useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { $coinStore } from '../../../../effector/coin/coin'
import { getCategory } from '../../../../effector/game/game'
import { toggleHistory, toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import './CoinGame.scss'
import { useSvg } from '../../../../hooks/useSvg'

const CoinGame = () => {
    const coin = useStore($coinStore)
    const auth = useStore($authStore)
    const { svg } = useSvg()

    const openHistoryPopup = () => {
        if (!auth.isAuth) {
            return toggleRegistration(true)
        }
        toggleHistory(true)
        getCategory('flipCoin')
    }
    return (
        <section className='coin__game coin__section'>
            <div className='coin__game-container'>
                <div className='coin__ratio'>
                    <span className='coin__ratio-number'>x1.9</span>
                    <span className='coin__ratio-title'>Коэфф.</span>
                </div>
                <div className={coin.gameStatus === 'end' ? 'flipHead flipTail' : ''} id="coins" >
                    <div
                        style={{ transform: coin.randomCoin === 0 ? 'rotateX(-180deg)' : '' }}
                        className='side head'>
                        DUN
                    </div>
                    <div
                        style={{ transform: coin.randomCoin === 1 ? 'rotateX(-180deg)' : '' }}
                        className='side tail'>
                        ON
                    </div>
                </div>
                <div className='coin__history'>
                    <div onClick={openHistoryPopup}>
                        <span className='coin__history-button'>
                            {svg.history}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CoinGame