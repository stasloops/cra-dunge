import React from 'react'
import LadderGame from '../../../components/games/ladder/ladderGame/LadderGame'
import LadderPanel from '../../../components/games/ladder/ladderPanel/LadderPanel'
import './Ladder.scss'

const Ladder = () => {
  return (
    <main className='ladder'>
      <div className='ladder__container'>
        <LadderGame />
        <LadderPanel />
      </div>
    </main>
  )
}

export default Ladder