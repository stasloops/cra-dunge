import React from 'react'
import { useStore } from 'effector-react'
import { $messageStore, deleteError } from '../../effector/messageScreen/messageScreen'
import './MessagePanel.scss'

const MessagePanel = () => {
    const message = useStore($messageStore)
    const errors = message.errors
   
    return (
        <div className='message'>
            {
                errors?.map((item: any, id: any) => (
                    <div key={id} className='message__container'>
                        <div onClick={() => deleteError(item.text)} className='message__delete icon__delete'>
                            <span className='icon__delete-x'>
                                x
                            </span>
                        </div>
                        <h5 className='message__text'>
                            {
                                item?.text 
                            } 
                        </h5>
                    </div>
                ))
            }
        </div >
    )
}

export default MessagePanel