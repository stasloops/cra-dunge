import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { updateBalance } from '../../../../effector/balance'
import { $diceStore, changeIsLoading, createGame } from '../../../../effector/dice/dice'
import { getCategory } from '../../../../effector/game/game'
import { getError } from '../../../../effector/messageScreen/messageScreen'
import { toggleHistory, toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import './DiceGame.scss'
import { useSvg } from '../../../../hooks/useSvg'

const DiceGame = () => {
  const { diceBet, range, droppedNumber, isLoading } = useStore($diceStore)
  const {svg} = useSvg()
  const [fromTo, setFromTo] = useState({ less: 0, more: 0 })
  const [coeff, setCoeff] = useState('2')
  const auth = useStore($authStore)

  const startGame = async (isMore: boolean) => {
    if (!auth.isAuth) {
      return toggleRegistration(true)
    }
    changeIsLoading(true)
    const data = {
      bet: diceBet,
      range: range,
      isMore: isMore
    }
    await createGame(data)
      .then((res) => {
        updateBalance(res.data.newBalance)
      })
      .catch((e) => {
        getError(e.response.data.message)
      })
    changeIsLoading(false)
  }

  const openHistoryPopup = () => {
    if (!auth.isAuth) {
      return toggleRegistration(true)
    }
    toggleHistory(true)
    getCategory('dice')
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
          <span className='dice__history-button'>
            {svg.history}
          </span>
        </div>
        <div className='dice__game-container'>
          <div className='dice__game-reward'>
            <div className='dice__game-reward-item'>
              <div className='dice__game-reward-coeff'>{coeff}x</div>
              <span className='dice__game-reward-description'>Коэфф.</span>
            </div>
            <div className='dice__game-reward-item'>
              <div className='dice__game-reward-reward'>{Number(coeff) * diceBet}</div>
              <span className='dice__game-reward-description'>Выигрыш</span>
            </div>
          </div>
          <div className='dice__game-content'>
            <div className='dice__game-dropped-number'>{!droppedNumber ? '000 000' : droppedNumber}</div>
            <div className='dice__game-items'>
              <div className='dice__game-item'>
                <button
                  style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  onClick={() => startGame(false)}
                  className='dice__game-select dice__game-select-less'
                >
                  МЕНЬШЕ
                </button>
                <div className='dice__game-fromto'>от 0 до {fromTo.less}</div>
              </div>
              <div className='dice__game-item'>
                <button
                  style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  onClick={() => startGame(true)}
                  className='dice__game-select dice__game-select-more'
                >
                  БОЛЬШЕ
                </button>
                <div className='dice__game-fromto'>от {fromTo.more} до 999999</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  </>)
}

export default DiceGame