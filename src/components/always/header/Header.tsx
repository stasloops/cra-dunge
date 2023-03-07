import React, { FC, useState } from 'react';
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import { $authStore } from '../../../effector/auth'
import { toggleLogin, toggleRegistration } from '../../../effector/togglePopup/togglePopup'
import LittleMenu from './components/littleMenu/LittleMenu'
import Balance from './components/balance/Balance'
import './Header.scss'
import { useSvg } from '../../../hooks/useSvg';
import { User } from '../../../types/userTypes';
import axios from 'axios';
import GoogleAuthButton from '../../GoogleAuthButton';

type HeaderProps = {
    setVisibleAside: (state: boolean) => void
    setVisibleChat: (state: boolean) => void
}

const Header: FC<HeaderProps> = ({ setVisibleAside, setVisibleChat }) => {
    const auth = useStore($authStore)
    const user: User = auth.user
    const { svg } = useSvg()
    const [toggleLittle, setToggleLittle] = useState(false)

    const toggleState = () => setToggleLittle(!toggleLittle)

    const openChat = () => {
        setTimeout(() => {
            setVisibleChat(true)
        })
    }


    return (
        <header className='header'>
            <div className='header__inner'>
                <nav className='header__nav'>
                    <Link className='header__logo-box' to='/'>
                        <div className='header__logo'>Dunge<span className='green-color'>ON</span></div>
                    </Link>
                    <div className='header__menu'>
                        <span onClick={toggleState}>
                            <span className='header__menu-item'></span>
                            <span className='header__menu-item'></span>
                            <span className='header__menu-item'></span>
                        </span>
                        <LittleMenu setVisibleAside={setVisibleAside} toggleLittle={toggleLittle} setToggleLittle={setToggleLittle} />
                    </div>
                    <Link to='/' className='header__item'>
                        <span className='header__item-icon header__icon-slot'>
                            {svg.slot}
                        </span>
                        <span className='header__item-title header__title-slot'>Главная</span>
                    </Link>
                    <Link to='/about' className='header__item'>
                        <span className='header__item-icon'>
                            {svg.about}
                        </span>
                        <span className='header__item-title'>Как играть</span>
                    </Link>
                    <Link to='/contact' className='header__item'>
                        <span className='header__item-icon'>
                            {svg.contact}
                        </span>
                        <span className='header__item-title'>Контакты</span>
                    </Link>
                    {
                        user.status === 'admin' ?
                            <div onClick={openChat} className='header__item'>
                                <span className='header__item-icon'>
                                    {svg.contact}
                                </span>
                                <span className='header__item-title'>Чат</span>
                            </div>
                            :
                            null
                    }
                </nav>
                <GoogleAuthButton />
                {
                    auth.isAuth ?
                        <div className='cont'>
                            <Balance setVisibleAside={setVisibleAside} />
                        </div>
                        :
                        <div className='header__auth'>
                            <button onClick={() => toggleRegistration(true)} className='header__button header__registration'>
                                РЕГИСТРАЦИЯ
                            </button>
                            <button onClick={() => toggleLogin(true)} className='header__button header__login'>
                                ВОЙТИ
                            </button>
                        </div>
                }
            </div>
        </header>
    )
}

export default Header