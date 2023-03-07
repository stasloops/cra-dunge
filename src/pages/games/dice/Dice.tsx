import React from 'react'
import DiceGame from '../../../components/games/dice/DiceGame/DiceGame'
import DicePanel from '../../../components/games/dice/DicePanel/DicePanel'
import './Dice.scss'

const Dice = () => {
  return (
    <main className='dice'>
      <div className='dice__container'>
        <DiceGame />
        <DicePanel />
      </div>
    </main>
  )
}

export default Dice