import React, { FC } from 'react'
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import { $authStore } from '../../../../../effector/auth'
import { toggleRegistration } from '../../../../../effector/togglePopup/togglePopup'
import './LittleMenu.scss'

type LittleMenuProps = {
    setToggleLittle: (state: boolean) => void
    toggleLittle: boolean
    setVisibleAside: (state: boolean) => void
}

const LittleMenu: FC<LittleMenuProps> = ({ setToggleLittle, toggleLittle, setVisibleAside }) => {
    const auth = useStore($authStore)

    const openMenuProfile = () => {
        setToggleLittle(false)
        if (!auth.isAuth) {
            return toggleRegistration(true)
        }
        setTimeout(() => {
            setVisibleAside(true)
        })
    }
    return (
        <div style={{ display: toggleLittle ? '' : 'none' }} className='little'>
            <div className='little__inner'>
                <div className='little__items'>
                    <Link to='/' onClick={() => setToggleLittle(false)} className='little__item'>
                        Главная
                    </Link>
                    <div onClick={openMenuProfile} className='little__item'>
                        Профиль
                    </div>
                    <Link to='/contact' onClick={() => setToggleLittle(false)} className='little__item'>
                        Контакты
                    </Link>
                    <Link to='/about' onClick={() => setToggleLittle(false)} className='little__item'>
                        Как играть
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LittleMenu