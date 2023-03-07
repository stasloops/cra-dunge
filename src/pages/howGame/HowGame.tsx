import React, { useState } from 'react'
import './HowGame.scss'
import { games, text } from './text'

const HowGame = () => {
    const [active, setActive] = useState('Coin')
    return (
        <section className='how'>
            <div className='how__container'>
                <h1 className='how__title'>Как играть</h1>
                <div className='how__games'>
                    {
                        games.map((item, id) => (
                            <div key={id} onClick={() => setActive(item.game)} className={`how__game ${active === item.game ? 'how__game-active' : ''}`}>
                                <span>
                                    {item.game}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div className='how__rules'>
                    <h1 className='how__title'>Правила {active}</h1>
                    <p className='how__text'>
                        Цель игры {active} –
                        {
                            text.map((item, id) => (
                                <span key={id}>{item.id === active ? item.rules: ''}</span>
                            ))
                        }
                    </p>
                    {/* <h5 className='how__title-little'>
                        Как играть?:
                    </h5>
                    <ul className='how__list'>
                        <li className='how__list-item'>Делайте ставку и жмите "Играть" и угадывайте, что выпадет - орел или решка.</li>
                    </ul>
                    <h5 className='how__title-little'>
                        Например:
                    </h5>
                    <ul className='how__list'>
                        <li className='how__list-item'>Вы начали играть</li>
                        <li className='how__list-item'>Выбираете например "Решка" и ждете какой вариант выпадет</li>
                        <li className='how__list-item'>Если вам повезло - То выпадет "Решка" и вы можете продолжить играть или забрать выигрыш</li>
                        <li className='how__list-item'>Если вам не повезло - То выпадет "Орел" и ставка будет анулирована</li>
                    </ul> */}
                </div>
            </div>
        </section>
    )
}

export default HowGame