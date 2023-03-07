import React, { FC, useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import { $authStore } from '../../../effector/auth'
import { useClose } from '../../../hooks/useClose'
import { User } from '../../../types/userTypes'
import { useSvg } from '../../../hooks/useSvg'
import './Chat.scss'
import axios from 'axios'
import { API_URL } from '../../../http'


type ChatProps = {
    visibleChat: boolean
    setVisibleChat: (state: boolean) => void
}

const Chat: FC<ChatProps> = ({ visibleChat, setVisibleChat }) => {
    const { value } = useClose(setVisibleChat)
    const auth = useStore($authStore)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const user: User = auth?.user

    useEffect(() => {    
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/chat`)
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMessage('')
        await axios.post(`${API_URL}/chat/new`, {
            message: message,
            id: Date.now()
        })   
    }

    return (
        <section style={{ right: visibleChat ? '0px' : '-450px' }} className='chat' ref={value}>
            <div className='chat__container'>
                <div onClick={() => setVisibleChat(false)} className='chat__close'>
                    +
                </div>
                <div className='chat__inner'>
                    <div className="chat__messages">
                        {messages.map(mess =>
                            <div className="chat__message" key={mess.id}>
                                {mess.message}
                            </div>
                        )}
                    </div>
                    <form className='chat__form'>
                        <input value={message} onChange={e => setMessage(e.target.value)} placeholder='Написать сообщение...' className='chat__input' />
                        <button onClick={(e) => sendMessage(e)} className='chat__button'>SEND</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Chat