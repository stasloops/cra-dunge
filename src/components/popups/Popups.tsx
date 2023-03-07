import React from 'react'
import './Popups.scss'
import LoginPopup from './allPopups/loginPopup/LoginPopup'
import { useStore } from 'effector-react'
import { $popupStore } from '../../effector/togglePopup/togglePopup'
import RegistrationPopup from './allPopups/registrationPopup/RegistrationPopup'
import HistoryPopup from './allPopups/historyPopup/HistoryPopup'
import TopUpPopup from './allPopups/topUpPopup/TopUpPopup'
import OutPopup from './allPopups/outPopup/OutPopup'
import { nanoid } from 'nanoid'

const Popups = () => {
  const popup = useStore($popupStore)
  const password = nanoid()

  return (
    <div className='popups'>
      {
        popup.login && <LoginPopup />
      }
      {
        popup.registration && <RegistrationPopup password={password} />
      }
      {
        popup.history && <HistoryPopup />
      }
      {
        popup.topUp && <TopUpPopup />
      }
      {
        popup.out && <OutPopup />
      }
    </div>
  )
}

export default Popups