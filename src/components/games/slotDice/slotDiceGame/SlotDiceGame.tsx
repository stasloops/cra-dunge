import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { getCategory } from '../../../../effector/game/game'
import { $slotStore } from '../../../../effector/slot/slot'
import { toggleHistory, toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import './SlotDiceGame.scss'
import { useSvg } from '../../../../hooks/useSvg'

const SlotDiceGame = () => {
  const { slotBet, range, droppedNumber } = useStore($slotStore)
  const {svg} = useSvg()
  const [fromTo, setFromTo] = useState({ less: 0, more: 0 })
  const [coeff, setCoeff] = useState('2')
  const auth = useStore($authStore)

  const openHistoryPopup = () => {
    if (!auth.isAuth) {
      return toggleRegistration(true)
    }
    toggleHistory(true)
    getCategory('slotDice')
  }

  useEffect(() => {
    const a = 1000000 / 100 * range
    const b = a - 1
    const c = 1000000 - a
    setFromTo({ less: b, more: c })
    const createCoeff = 100 / range - 0.01
    setCoeff(createCoeff.toFixed(2))
  }, [range])

  return (<>
    {
      <section className="dice__game">
        <div onClick={openHistoryPopup} className='dice__history'>
          <div className='dice__history-button'>
            {svg.history}
          </div>
        </div>
        <div className='dice__game-container'>
          <div className='dice__game-reward'>
            <div className='dice__game-reward-item'>
              <div className='dice__game-reward-coeff'>{coeff}x</div>
              <span className='dice__game-reward-description'>Коэфф.</span>
            </div>
            <div className='dice__game-reward-item'>
              <div className='dice__game-reward-reward'>{Number(coeff) * slotBet}</div>
              <span className='dice__game-reward-description'>Выигрыш</span>
            </div>
          </div>
          <div className='dice__game-content'>
            <div className='dice__game-dropped-number'>{!droppedNumber ? '000 000' : droppedNumber}</div>
            <div className='dice__game-items'>
              <div className='dice__game-item'>
                <div className='dice__game-fromto'>от 0 до {fromTo.less}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  </>)
}

export default SlotDiceGame