import React, { FC, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $balance, clientBet, clientReward, updateBalance } from '../../../../effector/balance'
import './CoinPanel.scss'
import { $coinStore, createGame, getCoinBet, endGame, calculationGame, changeIsLoading } from '../../../../effector/coin/coin'
import { getError } from '../../../../effector/messageScreen/messageScreen'
import { $authStore } from '../../../../effector/auth'
import { toggleRegistration } from '../../../../effector/togglePopup/togglePopup'

const CoinPanel: FC = () => {
    const [bet, setBet] = useState<string>('1')
    const [gameStatus, setGameStatus] = useState('start')
    const [selectedCoin, setSelectedCoin] = useState<number>(0)
    const balance = useStore($balance)
    const coin = useStore($coinStore)
    const auth = useStore($authStore)

    const COIN = [
        { color: 'green-color', name: 'Орел', mark: 'DUN', id: 0 },
        { color: 'blue-color', name: 'Решка', mark: 'ON', id: 1 }
    ]

    useEffect(() => {
        if (coin.gameStatus === 'end') {
            setTimeout(() => {
                setGameStatus(coin.gameStatus)
            }, 1500)
        } else {
            setGameStatus(coin.gameStatus)
        }
    }, [coin.gameStatus])


    useEffect(() => {
        if (coin.selectedCoin) {
            setSelectedCoin(coin.selectedCoin)
        }
    }, [coin.selectedCoin])

    const betChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBet(e.target.value)
    }

    useEffect(() => {
        if (coin.gameStatus === 'start') {
            setBet(bet.replace(/[^\d]/g, ''))
            getCoinBet(Number(bet))
        }
    }, [bet])

    useEffect(() => {
        if (coin.gameStatus === 'start') {
            if (coin.bet > 100) {
                getCoinBet(100)
            }
        }
    }, [coin.bet])

    const startGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!auth.isAuth) {
            return toggleRegistration(true)
        }
        clientBet(coin.bet)
        changeIsLoading(true)
        const data = {
            bet: coin.bet
        }
        await createGame(data)
            .then((res) => {
                updateBalance(res.data.newBalance)
                window.localStorage.setItem('coinGameId', res.data.gameId)
            })
            .catch((e) => {
                getError(e.response.data.message)
            })
        changeIsLoading(false)
    }

    const moveGame = async () => {
        changeIsLoading(true)
        const coinGameId = window.localStorage.getItem('coinGameId')
        const data = {
            gameID: coinGameId,
            selectedCoin: selectedCoin
        }
        await calculationGame(data)
            .catch((e) => {
                getError(e.response.data.message)
            })

        setTimeout(() => {
            changeIsLoading(false)
        }, 1500)
    }

    const restartGame = async () => {
        if (coin.isWin) {
            const reward = coin.bet * 1.9
            clientReward(reward)
        }
        changeIsLoading(true)

        const coinGameId = window.localStorage.getItem('coinGameId')
        const data = {
            gameID: coinGameId,
        }
        await endGame(data)
            .then((res) => {
                const newBalance = res.data.newBalance
                updateBalance(newBalance)
            })
            .catch((e) => {
                getError(e.response.data.message)
            })
        window.localStorage.removeItem('coinGameId')
        changeIsLoading(false)
    }

    return (
        <section className='coin__panel coin__section'>
            <h3 className='coin__panel-title'>
                СУММА СТАВКИ
            </h3>
            <form className='coin__form'>
                <input
                    type="text"
                    value={coin.bet}
                    onChange={e => betChange(e)}
                    className="coin__input"
                    style={{ pointerEvents: coin.gameStatus !== 'start' ? 'none' : 'auto' }}
                />
                {
                    coin.gameStatus === 'start' ?
                        <button
                            onClick={(e) => startGame(e)}
                            className='coin__button'
                            style={{ pointerEvents: balance < coin.bet ? 'none' : coin.bet === 0 ? 'none' :  coin.isLoading ? 'none' : 'auto' }}
                        >
                            Играть
                        </button>
                        :
                        null
                }
            </form>
            {
                coin.gameStatus !== 'start' ?
                    <div className='coin__select'>
                        <div className='coin__items'>
                            {
                                COIN.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedCoin(item.id)}
                                        className='coin__item'
                                        style={{
                                            border: selectedCoin === item.id ? '1px solid #86C232' : '',
                                            pointerEvents: coin.gameStatus !== 'calculation' ? 'none' : coin.isLoading ? 'none' : 'auto'
                                        }}
                                    >
                                        <span
                                            className={`coin__coin-panel ${item.color}`}>{item.mark}</span>
                                        <span>{item.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            coin.gameStatus === 'calculation' ?
                                <button
                                    onClick={moveGame}
                                    className='coin__button'
                                    style={{
                                        pointerEvents: selectedCoin === null ? 'none' : coin.isLoading ? 'none' : 'auto'
                                    }}
                                >
                                    Сделать ход
                                </button>
                                :
                                null
                        }
                        {
                            gameStatus === 'end' && coin.isWin === true ?
                                <button
                                    onClick={restartGame}
                                    className='coin__button'
                                    style={{ pointerEvents: coin.isLoading ? 'none' : 'auto' }}
                                >
                                    Забрать
                                </button>
                                :
                                gameStatus === 'end' && coin.isWin === false ?
                                    <button
                                        onClick={restartGame}
                                        className='coin__button'
                                        style={{ pointerEvents: coin.isLoading ? 'none' : 'auto' }}
                                    >
                                        Попробывать еще!
                                    </button>
                                    :
                                    null
                        }
                    </div>
                    :
                    null
            }
        </section>
    )
}

export default CoinPanel