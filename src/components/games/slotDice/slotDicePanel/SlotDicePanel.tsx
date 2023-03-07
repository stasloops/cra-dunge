import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { updateBalance } from '../../../../effector/balance'
import { createGame } from '../../../../effector/slot/slot'
import { getError } from '../../../../effector/messageScreen/messageScreen'
import { $slotStore, changeIsLoading, getSlotBet, getSlotRange } from '../../../../effector/slot/slot'
import { toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import './SlotDicePanel.scss'
import { clearInterval } from 'timers'

const SlotDicePanel = () => {
  const [bet, setBet] = useState<string>("1")
  const [range, setRange] = useState<string>("50")
  const [games, setGames] = useState<string>("50")
  const [interval, setInterval] = useState<number>()
  const [completedGames, setCompletedGames] = useState<number>(0)
  const [active, setActive] = useState<boolean>(() => {
    const resActive:any = localStorage.getItem('activeSlot')
    const parseActive = JSON.parse(resActive)
    return parseActive
  })
  const { slotBet, isLoading } = useStore($slotStore)
  const auth = useStore($authStore)

  const handleBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(e.target.value)
  }
  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(e.target.value)
  }
  const handleGames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGames(e.target.value)
  }

  useEffect(() => {
    setBet(bet.replace(/[^\d]/g, ''))
    getSlotBet(Number(bet))
  }, [bet])

  useEffect(() => {
    getSlotRange(Number(range))
  }, [range])

  useEffect(() => {
    if (slotBet > 100) {
      getSlotBet(100)
    }
  }, [slotBet])

  const startGame = async () => {
    const data = {
      bet: slotBet,
      range: range,
      isMore: false,
      category: 'slotDice'
    }
    await createGame(data)
      .then((res) => {
        updateBalance(res.data.newBalance)
      })
      .catch((e) => {
        getError(e.response.data.message)
      })
  }

  useEffect(() => {
    localStorage.setItem('activeSlot', JSON.stringify(active))
    
    if (active) {      
      const createInterval = window.setInterval(() => {
        startGame()
        setCompletedGames(prev => prev + 1)
      }, 1000)

      return ()=> {
        window.clearInterval(createInterval)        
      }
    }
  }, [active])

  useEffect(() => {
    if (Number(games) === completedGames) {
      setActive(false)
      window.clearInterval(interval)
      setCompletedGames(0)
    }
  }, [completedGames])

  const changeActive = () => {
    if (!auth.isAuth) {
      return toggleRegistration(true)
    }
    if (active) {
      setActive(false)
      setCompletedGames(0)
      return window.clearInterval(interval)
    }
    changeIsLoading(true)
    setActive(true)
    setTimeout(() => {
      changeIsLoading(false)
    }, 1000)
  }
  return (
    <section className="slot__panel">
      <div className="slot__panel-container">
        <h4 className='slot__title'>СУММА СТАВКИ</h4>
        <input
          style={{ pointerEvents: active ? 'none' : 'auto' }}
          type="text"
          value={slotBet}
          onChange={e => handleBet(e)}
          className='slot__input'
        />
        <h4 className='slot__title'>ШАНС ВЫИГРЫША</h4>
        <div className='slot__range'>
          <input
            style={{ pointerEvents: active ? 'none' : 'auto' }}
            onChange={handleRange}
            className='slot__range-input'
            type="range"
            min="1"
            max="95"
          />
          <div className='slot__range-percent'><span>{range} %</span></div>
        </div>
        <h4 className='slot__title'>СЫГРАТЬ ИГР</h4>
        <div className='slot__range'>
          <input
            style={{ pointerEvents: active ? 'none' : 'auto' }}
            onChange={handleGames}
            className='slot__range-input'
            type="range"
            min="1"
            max="100"
          />
          <div className='slot__range-percent'><span>{games}</span></div>
        </div>
        <button
          onClick={changeActive}
          className='slot__panel-button'
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
        >
          {active ? 'ОСТАНОВИТЬ ИГРУ' : 'НАЧАТЬ ИГРУ'}
        </button>
      </div>
    </section >
  )
}

export default SlotDicePanel