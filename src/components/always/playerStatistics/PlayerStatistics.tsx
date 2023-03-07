import React from 'react'
import './PlayerStatistics.scss'

const PlayerStatistics = () => {
    const statistics = [
        { title: 'ОНЛАЙН', count: '999' },
        { title: 'ВСЕГО ИГРОКОВ', count: '999 999' },
        { title: 'ИГРОКОВ ЗА СЕГОДНЯ', count: '9 999' },
        { title: 'ВСЕГО ИГР', count: '999 999 999' },

    ]
    return (
        <section className='player'>
            <div className='player__items'>
                {
                    statistics.map((item) => (
                        <div key={item.title} className='player__item'>
                            <div className='player__item-box'>
                                <span className='player__item-title'>{item.title}</span>
                                <span className='player__item-count'>{item.count}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PlayerStatistics