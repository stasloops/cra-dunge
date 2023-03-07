import React from 'react'
import SlotDiceGame from '../../../components/games/slotDice/slotDiceGame/SlotDiceGame'
import SlotDicePanel from '../../../components/games/slotDice/slotDicePanel/SlotDicePanel'
import './SlotDice.scss'


const SlotDice = () => {
  return (
    <main className='slot'>
      <div className='slot__container'>
        <SlotDiceGame />
        <SlotDicePanel />
      </div>
    </main>
  )
}

export default SlotDice