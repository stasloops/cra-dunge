import React, { FC } from 'react'
import { useStore } from 'effector-react'
import Cookies from 'js-cookie'
import { $authStore, logout } from '../../../effector/auth'
import { updateBalance } from '../../../effector/balance'
import { getCategory } from '../../../effector/game/game'
import { toggleHistory, toggleOut, toggleTopUp } from '../../../effector/togglePopup/togglePopup'
import { useClose } from '../../../hooks/useClose'
import { User } from '../../../types/userTypes'
import { useSvg } from '../../../hooks/useSvg'
import './ProfileMenu.scss'

type ProfileMenuProps = {
    visibleAside: boolean
    setVisibleAside: (state: boolean) => void
}

const ProfileMenu: FC<ProfileMenuProps> = ({ visibleAside, setVisibleAside }) => {
    const { value } = useClose(setVisibleAside)
    const auth = useStore($authStore)
    const user: User = auth?.user
    const { svg } = useSvg()

    const exit = () => {
        logout()
        updateBalance(0)
        setVisibleAside(false)
        Cookies.remove('refreshToken')
    }

    const openHistoryPopup = () => {
        toggleHistory(true)
        setVisibleAside(false)
        getCategory('all')
    }

    const openTopUp = () => {
        setVisibleAside(false)
        toggleTopUp(true)
    }

    const openOut = () => {
        setVisibleAside(false)
        toggleOut(true)
    }
    
    return (
        <aside style={{ right: visibleAside ? '0px' : '-450px' }} className='aside' ref={value}>
            <div className='aside__container'>
                <div onClick={() => setVisibleAside(false)} className='aside__close'>
                    +
                </div>
                <div className='aside__inner'>
                    <div className='aside__profile'>
                        <div className='aside__avatar'>
                            <span>
                                ?
                            </span>
                            <span className='aside__id'>
                                ID:{user?.id}
                            </span>
                        </div>
                        <div className='aside__name'>
                        </div>
                    </div>
                    <div className='aside__item' onClick={openHistoryPopup} >
                        <div className='aside__icon'>
                            <div className='aside__icon-history'>
                                {svg.history}
                            </div>
                        </div>
                        История
                    </div>
                    <div className='aside__item' onClick={openTopUp}>
                        <div className='aside__icon'><span className='icon__plus'>+</span></div>
                        <span className='aside__title'>Пополнить</span>
                    </div>
                    <div className='aside__item' onClick={openOut}>
                        <div className='aside__icon'><span className='icon__minus'>-</span></div>
                        <span className='aside__title'>Вывод</span>
                    </div>
                    <div className='aside__item' onClick={exit}>
                        <div className='aside__icon icon__delete'><span className='icon__delete-x'>+</span></div>
                        <span className='aside__title'>Выход</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ProfileMenu