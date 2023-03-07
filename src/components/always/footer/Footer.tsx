import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__rights'>© 2022 DungeON ALL RIGHTS RESERVED "NO"</div>
                <div className='footer__logo'>Dunge<span className='green-color'>ON</span></div>
                <div className='footer__version'>Version: 0.0.1</div>
            </div>
        </footer>
    )
}

export default Footer