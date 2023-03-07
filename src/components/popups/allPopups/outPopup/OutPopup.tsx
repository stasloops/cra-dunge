import React, { useEffect, useState } from 'react'
import './OutPopup.scss'
import { toggleOut } from '../../../../effector/togglePopup/togglePopup'
import { useClose } from '../../../../hooks/useClose'
import { nanoid } from 'nanoid'
import $api, { API_URL } from '../../../../http'
import { useStore } from 'effector-react'
import { $authStore } from '../../../../effector/auth'
import { User } from '../../../../types/userTypes'
import { getError } from '../../../../effector/messageScreen/messageScreen'

const OutPopup = () => {
  const { value } = useClose(toggleOut)
  const auth = useStore($authStore)
  const user: User = auth.user

  const [valueAmount, setValueAmount] = useState<string | number>(100)
  const [amount, setAmount] = useState<number>(100)
  const [cardNumber, setCardNumber] = useState<string>('')
  const transferId = nanoid()

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAmount(e.target.value)
  }

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }

  const plusAmount = () => {
    setAmount(prev => prev + 10)
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
  setValueAmount(amount)
}, [amount])


const createTransfer = async () => {
  if (cardNumber.length !== 19) {
    return null
  }

  if (user.status === 'test') {
    getError('У Вас должно быть хотя бы одно пополнение баланса за последние 2 недели!')
    return toggleOut(false)
  }

  try {
    const data = {
      transferId: transferId,
      requisites: cardNumber,
      amount: amount
    }
    await $api.post(`${API_URL}/transfer/remove`, data)
  } catch (e) {
    console.log(e);

  }
  toggleOut(false)
}

return (
  <div className='out'>
    <div ref={value} className='out__inner'>
      <div className='out__top'>
        <h2 className='out__title'>ВЫВОД СРЕДСТВ</h2>
        <span onClick={() => toggleOut(false)} className='out__close'>+</span>
      </div>
      <div className="out__bottom">
        <div className="out__form">
          <h3 className='out__form-title'>На Банк. карту</h3>
          <h6 className='out__input-title'>Укажите сумму голды</h6>
          <div className='out__form-item'>
            <button onClick={minusAmount} className='out__change'>-</button>
            <div className='out__input-box'>
              <input onChange={(e) => handleAmount(e)} value={valueAmount} className='out__input' />
            </div>
            <button onClick={plusAmount} className='out__change'>+</button>
          </div>
          <h6 className='out__will-be-credited'>Будет зачислено: <span className='fffclr'>{valueAmount} руб.</span></h6>
          <div className='out__form-item'>
            <div className='out__input-box'>
              <input onChange={(e) => handleCardNumber(e)} value={cardNumber} placeholder="4923 5582 1302 6767" className='out__input out__input-card-number' />
              <label className='out__label'>Формат кошелька: 4923 5582 1302 6767</label>
            </div>
          </div>
          <p className='out__text'>Обработка происходит вручную, поэтому время обработки вашего запроса зависит от того чем я щас занимаюсь...</p>
          <div className='out__rate'>
            {amount} голды. = {amount}.00 руб.
          </div>
          <button style={{ pointerEvents: amount === 0 ? 'none' : 'auto' }} onClick={createTransfer} className='out__send'>Получить выплату</button>
          <p className='out__help'>Если вам нужна помощь, вы можете связаться<a className='contact__link' target="_blank" href='https://t.me/JustNeich'> здесь.</a></p>
        </div>
      </div>
    </div>
  </div>
)
}

export default OutPopup