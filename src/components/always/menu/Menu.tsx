import React from 'react'
import { Link } from 'react-router-dom'
import { useSvg } from '../../../hooks/useSvg'
import './Menu.scss'

const Menu = () => {
  const { svg } = useSvg()

  return (
    <aside className='menu'>
      <Link className='menu__logo-box' to='/'>
        <div className='menu__logo'>D<span className='green-color'>ON</span></div>
      </Link>
      <nav className='menu__items'>
        <Link className='menu__item' to="/slots">
          <span className='menu__icon menu__slot'>
            {svg.slot}
          </span>
          <div className='menu__side'>
            Dice Slots
          </div>
        </Link>
        <Link className='menu__item' to="/coin">
          <span className='menu__icon'>
            {svg.coin}
          </span>
          <div className='menu__side'>
            Coin
          </div>
        </Link>
        <Link className='menu__item' to="/ladder">
          <span className='menu__icon menu__ladder'>
            {svg.ladder}
          </span>
          <div className='menu__side'>
            Ladder
          </div>
        </Link>
        <Link className='menu__item' to="/dice">
          <span className='menu__icon menu__dice'>
            {svg.dice}
          </span>
          <div className='menu__side'>
            Dice
          </div>
        </Link>
      </nav>
    </aside>
  )
}

export default Menu