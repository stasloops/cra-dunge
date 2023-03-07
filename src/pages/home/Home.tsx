import React from 'react'
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import { $authStore } from '../../effector/auth'
import { toggleRegistration } from '../../effector/togglePopup/togglePopup'
import './Home.scss'
import { useSvg } from '../../hooks/useSvg'

const Home = () => {
  const auth = useStore($authStore)
  const { svg } = useSvg()
  const GAMES = [
    { path: 'coin', title: 'COIN' },
    { path: 'ladder', title: 'LADDER' },
    { path: 'dice', title: 'DICE' },
    { path: 'slots', title: 'DICE SLOTS' },
  ]

  const openRegistration = () => {
    if (auth.isAuth) {
      return null
    }
    toggleRegistration(true)
  }
  return (
    <main className='home'>
      <div className='home__container'>
        <div className='home__banner'>
          <div onClick={() => openRegistration()} className='home__background'>
            <div className='home__button'>
              <div className='home__button-gold'>
                50 голды
              </div>
              <div className='home__button-registration'>
                При регистрации
              </div>
              <button className='home__button-get-bonus'>
                ПОЛУЧИТЬ БОНУС
              </button>
            </div>
            <div className='home__strip-container'>
              <span className='home__strip'></span>
            </div>
          </div>
          <div className='home__banner-bottom'>
            <div className='home__items'>
              {
                GAMES.map((item, id) => (
                  <Link className="home__item-link" key={id} to={`/${item.path}`}>
                    <span className="home__item">{item.title}</span>
                  </Link>
                ))
              }

            </div>
          </div>
        </div>
        <div className='home__games'>
          <Link to="/slots" className='home__game'>
            <span className='home__icon'>
              {svg.slot}
            </span>
            <h5 className='home__game-title'>Dice Slots</h5>
          </Link>
          <Link to="/coin" className='home__game'>
            <span className='home__icon'>
              {svg.coin}
            </span>
            <h5 className='home__game-title'>Coin</h5>
          </Link>
          <Link to="/ladder" className='home__game'>
            <span className='home__icon'>
              {svg.ladder}
            </span>
            <h5 className='home__game-title'>Ladder</h5>
          </Link>
          <Link to="/dice" className='home__game'>
            <span className='home__icon'>
              {svg.dice}
            </span>
            <h5 className='home__game-title'>Dice</h5>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home