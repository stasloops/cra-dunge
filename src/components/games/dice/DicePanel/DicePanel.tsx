import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { $diceStore, getDiceBet, getDiceRange } from '../../../../effector/dice/dice'
import './DicePanel.scss'

const DicePanel = () => {
  const [bet, setBet] = useState<string>("1")
  const [range, setRange] = useState<string>("50")
  const { diceBet } = useStore($diceStore)
  const auth = useStore($authStore)

  const handleBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(e.target.value)
  }
  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(e.target.value)
  }

  useEffect(() => {
    setBet(bet.replace(/[^\d]/g, ''))
    getDiceBet(Number(bet))
  }, [bet])

  useEffect(() => {
    getDiceRange(Number(range))
  }, [range])

  useEffect(() => {
    if (diceBet > 100) {
      getDiceBet(100)
    }
  }, [diceBet])

  return (
    <section className="dice__panel">
      <div className="dice__panel-container">
        <h4 className='dice__title'>СУММА СТАВКИ</h4>
        <input
          type="text"
          value={diceBet}
          onChange={e => handleBet(e)}
          className='dice__input' />
        <h4 className='dice__title'>ШАНС ВЫИГРЫША</h4>
        <div className='dice__range'>
          <input onChange={handleRange} className='dice__range-input' type="range" min="1" max="95" />
          <div className='dice__range-percent'><span>{range} %</span></div>
        </div>
      </div>
    </section>
  )
}

export default DicePanel