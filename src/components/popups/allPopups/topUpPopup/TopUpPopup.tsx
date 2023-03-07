import React, { useEffect, useState } from 'react'
import { toggleTopUp } from '../../../../effector/togglePopup/togglePopup'
import { useClose } from '../../../../hooks/useClose'
import $api, { API_URL } from '../../../../http'
import './TopUpPopup.scss'

const TopUpPopup = () => {
    const { value } = useClose(toggleTopUp)
    const [valueAmount, setValueAmount] = useState<string | number>(100)
    const [amount, setAmount] = useState<number>(100)
    const [goToPay, setGoToPay] = useState<boolean>(false)


    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueAmount(e.target.value)
    }

    const plusAmount = () => {
        if (amount < 5000) {
            setAmount(prev => prev + 10)
        }
    }

    const minusAmount = () => {
        if (amount > 10) {
            setAmount(prev => prev - 10)
        }
    }

    useEffect(() => {
        setAmount(Number(valueAmount))
    }, [valueAmount])

    useEffect(() => {
        if (amount > 5000) {
            return setValueAmount(5000)
        }
        if (amount < 10) {
            return setValueAmount(10)
        }
        setValueAmount(amount)

    }, [amount])

    const createTransfer = async () => {
        try {
            const data = {
                amount: valueAmount
            }
            const res = await $api.post(`${API_URL}/transfer/add`, data)
            localStorage.setItem('payment', JSON.stringify(res.data.qiwi))
            setGoToPay(true)
        } catch (e) {
            console.log(e);
        }
    }

    const paymentData = localStorage.getItem('payment')
    const payment = JSON.parse(paymentData)

    return (
        <div className='topup'>
            <div ref={value} className='topup__inner'>
                <div className='topup__top'>
                    <h2 className='topup__title'>ПОПОЛНИТЬ БАЛАНС</h2>
                    <span onClick={() => toggleTopUp(false)} className='topup__close'>+</span>
                </div>
                <div className="topup__bottom">
                    <div className="topup__form">
                        {
                            payment || goToPay ?
                                <div className='topup__send-box'>
                                    <a target="_blank" href={payment.payUrl}>
                                        <button className='topup__payment'>Перейти к оплате</button>
                                    </a>
                                </div>
                                :
                                <>
                                    <h6 className='out__input-title'>Укажите сумму на оплату</h6>
                                    <div className='out__form-item'>
                                        <button onClick={minusAmount} className='out__change'>-</button>
                                        <div className='topup__input-box'>
                                            <input onChange={(e) => handleAmount(e)} value={valueAmount} className='topup__input' />
                                            <span className='topup__input-currency'> руб.</span>
                                        </div>
                                        <button onClick={plusAmount} className='out__change'>+</button>
                                    </div>
                                    <h6 className='out__will-be-credited'>Будет зачислено: <span className='fffclr'>{valueAmount} голды.</span></h6>
                                    <h6 className='out__will-be-credited-limit'><span className='fffclr'>Минимальная сумма пополнения: </span>10</h6>
                                    <h6 className='out__will-be-credited-limit'><span className='fffclr'>Максимальная сумма пополнения: </span>5000</h6>
                                    <div className='topup__send-box'>
                                        <button onClick={createTransfer} className='topup__send'>ОТПРАВИТЬ</button>
                                    </div>
                                    <p className='topup__help'>Если вам нужна помощь, вы можете связаться<a className='contact__link' target="_blank" href='https://t.me/JustNeich'> здесь.</a></p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopUpPopup