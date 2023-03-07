import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $game, getFiltredGames } from '../../../../effector/game/game'
import { GameStore, IGame } from '../../../../effector/game/gameTypes'
import { toggleHistory } from '../../../../effector/togglePopup/togglePopup'
import { useClose } from '../../../../hooks/useClose'
import './HistoryPopup.scss'

const HistoryPopup = () => {
    const game = useStore<GameStore>($game)
    const [games, setGames] = useState<IGame[]>([])
    const { value } = useClose(toggleHistory)

    const getGames = async () => {
        const category = game.category
        await getFiltredGames({ category })
    }

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        if (game.games) {
            const reverseGames: IGame[] = game.games.reverse()
            setGames(reverseGames)
        }
    }, [game])

    return (
        <div className='history'>
            <div ref={value} className='history__panel'>
                <span onClick={() => toggleHistory(false)} className='history__close'>
                    +
                </span>
                <h2 className='history__title'>История Игр "{game.category}"</h2>
                <div className='history__parameters'>
                    <div className='history__shadow'>

                    </div>
                    <span className='history__parameters-item'>
                        ID Игры
                    </span>
                    <span className='history__parameters-item'>
                        Ставка
                    </span>
                    <span className='history__parameters-item'>
                        Коефф
                    </span>
                    <span className='history__parameters-item'>
                        Выигрыш
                    </span>
                </div>
                <section className='history__games'>
                    {
                        games?.map((item, id) => (
                            <div key={id} className='history__game'>
                                <span className='history__game-item'>
                                    {item.gameId}
                                </span>
                                <span className='history__game-item'>
                                    {item.bet}
                                </span>
                                <span className='history__game-item'>
                                    {item.coeff}X
                                </span>
                                <span className='history__game-item'>
                                    {item.reward}
                                </span>
                            </div>
                        ))
                    }
                </section>
                <div className='history__count'>Игр: {game.games?.length}</div>
            </div>
        </div>
    )
}

export default HistoryPopup