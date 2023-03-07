import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { clientBet, updateBalance } from '../../../../effector/balance'
import { $ladderStore, changeIsLoading, createGame, endGame, getLadderBet } from '../../../../effector/ladder/ladder'
import { getError } from '../../../../effector/messageScreen/messageScreen'
import { toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import './LadderPanel.scss'

const LadderPanel = () => {
  const [bet, setBet] = useState<string>("1")
  const { gameStatus, ladderBet, isFail } = useStore($ladderStore)
  const auth = useStore($authStore)
  const betChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(e.target.value)
  }

  useEffect(() => {
    if (gameStatus === 'start') {
      setBet(bet.replace(/[^\d]/g, ''))
      getLadderBet(Number(bet))
    }
  }, [bet])

  useEffect(() => {
    if (gameStatus === 'start') {
      if (ladderBet > 100) {
        getLadderBet(100)
      }
    }
  }, [ladderBet])

  const startGame = async () => {
    if (!auth.isAuth) {
      return toggleRegistration(true)
    }
    clientBet(ladderBet)
    changeIsLoading(true)
    const data = {
      bet: ladderBet
    }
    await createGame(data)
      .then((res) => {
        updateBalance(res.data.balance)
        window.localStorage.setItem('ladderGameId', res.data.gameId)
      })
      .catch((e) => {
        getError(e.response.data.message)
      })
    changeIsLoading(false)
  }

  const restartGame = async () => {
    changeIsLoading(true)

    const coinGameId = window.localStorage.getItem('ladderGameId')
    const data = {
      gameID: coinGameId,
    }
    await endGame(data)
      .then((res) => {
        updateBalance(res.data.balance)
      })
      .catch((e) => {
        getError(e.response.data.message)
      })
    window.localStorage.removeItem('ladderGameId')
    changeIsLoading(false)
  }

  return (
    <section className="ladder__panel">
      <div className="ladder__panel-container">
        <h4 className='ladder__title'>СУММА СТАВКИ</h4>
        <input
          type="text"
          value={ladderBet}
          onChange={e => betChange(e)}
          style={{ pointerEvents: gameStatus !== 'start' ? 'none' : 'auto' }}
          className='ladder__input' />
        <button
          onClick={gameStatus === 'start' ? startGame : restartGame}
          style={{ pointerEvents: gameStatus === 'calculation' ? 'none' : 'auto' }}
          className='ladder__button'>
          {
            gameStatus === 'start' ? 'Играть' : gameStatus === 'end' ? 'Забрать' : isFail ? 'Попробывать снова!' : 'Выберите плитку'
          }
        </button>
      </div>
    </section>
  )
}

export default LadderPanel