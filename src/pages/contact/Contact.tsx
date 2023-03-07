import React from 'react'
import './Contact.scss'

const Contact = () => {
    return (
        <section className='contact'>
            <div className='contact__container'>
                <h1 className='contact__title'>
                    Служба поддержки
                </h1>
                <p className='contact__text'>Для связи с поддержкой, пожалуйста нажмите <a className='contact__link' target="_blank" href='https://t.me/JustNeich'>сюда</a></p>
            </div>
        </section>
    )
}

export default Contact