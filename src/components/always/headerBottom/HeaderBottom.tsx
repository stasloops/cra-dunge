import React, { FC, useState } from 'react'
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import { $authStore } from '../../../effector/auth'
import { toggleRegistration } from '../../../effector/togglePopup/togglePopup'
import More from './components/more/More'
import './HeaderBottom.scss'

type HeaderBottomProps = {
    setVisibleAside: (state: boolean) => void
    visibleAside: boolean
}

const HeaderBottom: FC<HeaderBottomProps> = ({ setVisibleAside, visibleAside }) => {
    const [isActiveMore, setIsActiveMore] = useState(false)
    const auth = useStore($authStore)

    const toggleAside = () => {  
        if (!auth.isAuth) {
            return toggleRegistration(true)
        }
        if (!visibleAside) {
            setTimeout(() => {
                setVisibleAside(true)
            })
        }
    }

    const toggleMore = () => {
        if (isActiveMore) {
            return setIsActiveMore(false)
        }
        setIsActiveMore(true)
    }

    return (
        <div className='bottom'>
            <More isActiveMore={isActiveMore} setIsActiveMore={setIsActiveMore} />
            <div className='bottom__header'>
                <nav className='bottom__nav'>
                    <Link to='/' className='bottom__item'>
                        <svg className='bottom__item-icon' viewBox="0 0 512 512"><g><g id="XMLID_1203_"><g id="XMLID_304_"><path id="XMLID_305_" d="m462 66h-161c-5.523 0-10 4.477-10 10s4.477 10 10 10h161c16.542 0 30 13.458 30 30v280c0 16.542-13.458 30-30 30h-412c-16.542 0-30-13.458-30-30v-280c0-16.542 13.458-30 30-30h161c5.523 0 10-4.477 10-10s-4.477-10-10-10h-161c-27.57 0-50 22.43-50 50v280c0 27.57 22.43 50 50 50h412c27.57 0 50-22.43 50-50v-280c0-27.57-22.43-50-50-50z" data-original="#000000" /><path id="XMLID_581_" d="m44 120v272c0 5.523 4.477 10 10 10h404c5.523 0 10-4.477 10-10v-272c0-5.523-4.477-10-10-10h-404c-5.523 0-10 4.477-10 10zm155 262v-252h114v252zm249 0h-115v-252h115zm-384-252h115v252h-115z" data-original="#000000" /><path id="XMLID_1073_" d="m156.874 201.454c-1.847-2.829-4.996-4.534-8.374-4.534h-54c-5.523 0-10 4.477-10 10s4.477 10 10 10h38.681l-36.985 84.135c-2.222 5.056.075 10.956 5.13 13.179 1.31.575 2.675.848 4.019.848 3.846 0 7.513-2.231 9.16-5.978l43.149-98.159c1.36-3.093 1.066-6.662-.78-9.491z" data-original="#000000" /><path id="XMLID_1074_" d="m363.5 216.92h38.681l-36.985 84.135c-2.222 5.056.075 10.956 5.13 13.179 1.31.575 2.675.848 4.019.848 3.846 0 7.513-2.231 9.16-5.978l43.149-98.159c1.359-3.092 1.066-6.662-.78-9.491-1.847-2.829-4.996-4.534-8.374-4.534h-54c-5.523 0-10 4.477-10 10s4.477 10 10 10z" data-original="#000000" /><path id="XMLID_1077_" d="m291.374 201.454c-1.847-2.829-4.996-4.534-8.374-4.534h-54c-5.523 0-10 4.477-10 10s4.477 10 10 10h38.681l-36.985 84.135c-2.222 5.056.075 10.956 5.13 13.179 1.31.575 2.675.848 4.019.848 3.846 0 7.513-2.231 9.16-5.978l43.149-98.159c1.36-3.093 1.066-6.662-.78-9.491z" data-original="#000000" /><path id="XMLID_1078_" d="m256 86c2.63 0 5.21-1.07 7.07-2.93s2.93-4.44 2.93-7.07-1.07-5.21-2.93-7.07-4.44-2.93-7.07-2.93-5.21 1.07-7.07 2.93-2.93 4.44-2.93 7.07 1.07 5.21 2.93 7.07 4.44 2.93 7.07 2.93z" data-original="#000000" /></g></g></g> </svg>
                        <div className='bottom__item-title'>
                            Главная
                        </div>
                    </Link>
                    <div onClick={toggleAside} className='bottom__item'>
                        <svg className='bottom__item-icon' viewBox="0 0 27 32"><path d="M13.718 15.334c3.31 0 5.993-2.683 5.993-5.993s-2.683-5.993-5.993-5.993-5.993 2.683-5.993 5.993 2.683 5.993 5.993 5.993zM0.9 26.688c-0.167 1.032 0.666 1.965 1.698 1.965h22.241c1.066 0 1.865-0.933 1.698-1.965-0.966-5.959-6.326-9.356-12.818-9.356s-11.853 3.396-12.819 9.356z"></path></svg>
                        <div className='bottom__item-title'>
                            Профиль
                        </div>
                    </div>
                    <div className='bottom__item'>
                        <svg className='bottom__item-icon' viewBox="0 0 104 32"><path d="M15.719 29.75c7.974 0 14.438-6.464 14.438-14.438s-6.464-14.438-14.438-14.438v0c-7.974 0-14.438 6.464-14.438 14.438s6.464 14.438 14.438 14.438v0zM50.875 29.75c7.974 0 14.438-6.464 14.438-14.438s-6.464-14.438-14.438-14.438v0c-7.974 0-14.438 6.464-14.438 14.438s6.464 14.438 14.438 14.438v0zM86.063 29.75c7.974 0 14.438-6.464 14.438-14.438s-6.464-14.438-14.438-14.438v0c-7.974 0-14.438 6.464-14.438 14.438s6.464 14.438 14.438 14.438v0z"></path></svg>
                        <div onClick={toggleMore} className='bottom__item-title'>
                            Еще
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HeaderBottom