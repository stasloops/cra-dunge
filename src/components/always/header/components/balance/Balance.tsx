import React, { FC } from 'react'
import { useStore } from 'effector-react'
import { $balance } from '../../../../../effector/balance'
import { toggleOut, toggleTopUp } from '../../../../../effector/togglePopup/togglePopup'
import './Balance.scss'

type BalanceProps = {
    setVisibleAside: (state: boolean) => void
}

const Balance: FC<BalanceProps> = ({ setVisibleAside }) => {
    const balance = useStore($balance)
    const filterBalance = Math.round(balance * 100) / 100

    const toggleAside = () => {
        setTimeout(() => {
            setVisibleAside(true)
        })
    }

    return (
        <section className='balance'>
            <div className='balance__content'>
                <span className='balance__title'>
                    Баланс
                </span>
                <div className='balance__score'>
                    {filterBalance}
                </div>
                <div className='balance__change'>
                    <div onClick={() => toggleTopUp(true)} className='balance__change-item'>
                        <span className='balance__plus'>+ Пополнить</span>
                    </div>
                    <div onClick={() => toggleOut(true)} className='balance__change-item'>
                        <span className='balance__minus'>- Вывести</span>
                    </div>
                </div>
            </div>
            <div onClick={toggleAside} className='balance__profile'>?</div>
        </section>
    )
}

export default Balance