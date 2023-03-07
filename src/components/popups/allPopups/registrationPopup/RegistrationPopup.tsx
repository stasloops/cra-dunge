import React, { FC, useState } from 'react'
import { registration } from '../../../../effector/auth'
import { updateBalance } from '../../../../effector/balance'
import { toggleLogin, toggleRegistration } from '../../../../effector/togglePopup/togglePopup'
import { useClose } from '../../../../hooks/useClose'
import './RegistrationPopup.scss'

type RegistrationPopupProps = {
    password: string
}

const RegistrationPopup: FC<RegistrationPopupProps> = ({ password }) => {
    const [email, setEmail] = useState('')
    const { value } = useClose(toggleRegistration)
    const [error, setError] = useState<string>('')


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const swapForm = () => {
        toggleLogin(true)
        toggleRegistration(false)
    }

    const sendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const userData = {
                email,
                password
            }
            const res = await registration(userData)
            updateBalance(res.data.userData.balance)
            toggleRegistration(false)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    return (
        <div className='registration'>
            <div ref={value} className='registration__inner'>
                <div className='login__top'>
                    <h2 className='registration__title'>Регистрация</h2>
                    <span onClick={() => toggleRegistration(false)} className='registration__close'>+</span>
                </div>
                <form className='login__form'>
                    <div className='registration__item'>
                        <label className='registration__label'>E-mail</label>
                        <input value={email} onChange={(e) => handleEmail(e)} placeholder='E-mail' className='registration__input' />
                    </div>
                    {
                        error ?
                            <p className='registration__error'>{error}</p> : null
                    }
                    <div className='registration__item'>
                        <label className='registration__label'>Пароль</label>
                        <input value={password} className='registration__input' />
                    </div>
                    <p className='registration__text'>Сохраните пароль в надежном месте. Больше такой возможности не будет!</p>
                    <button onClick={(e) => sendForm(e)} className='registration__button'>Зарегестрироваться</button>
                </form>
                <p className='registration__swap'>У вас уже есть аккаунт? <span onClick={swapForm} className='registration__swap-login'>Войти</span></p>
            </div>
        </div>
    )
}

export default RegistrationPopup