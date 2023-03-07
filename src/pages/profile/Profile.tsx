import React from 'react'
import { useStore } from 'effector-react'
import { Navigate } from 'react-router-dom'
import { $authStore } from '../../effector/auth'
import { $balance } from '../../effector/balance'
import { User } from '../../types/userTypes'
import './Profile.scss'

const Profile = () => {
    const auth = useStore($authStore)
    const balance = useStore($balance)
    const user: User = auth.user
    const filterBalance = Math.round(balance * 100) / 100

    if (!auth.isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <main className='profile'>
            <div className='profile__container'>
                <div className='profile__left'>
                    <div className='profile__avatar'>
                        <span>
                            S
                        </span>
                        <span className='profile__id'>
                            ID:{user.id}
                        </span>
                    </div>
                    <div className='profile__name'>
                        STIES
                    </div>
                    <div className='profile__balance'>
                        <h6 className='profile__balance-title'>
                            Баланс
                        </h6>
                        <div className='profile__balance-point'>
                            {filterBalance}
                        </div>
                        <div className='profile__balance-buttons'>
                            <button className='profile__balance-button'>
                                ПОПОЛНИТЬ
                            </button>
                            <button className='profile__balance-button'>
                                ВЫВЕСТИ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile