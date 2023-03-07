import { createEvent, createStore } from "effector";
import { PopupStore } from "./togglePopupTypes";


export const toggleLogin = createEvent<boolean>()
export const toggleRegistration = createEvent<boolean>()
export const toggleHistory = createEvent<boolean>()
export const toggleTopUp = createEvent<boolean>()
export const toggleOut = createEvent<boolean>()

export const $popupStore = createStore<PopupStore>({
    login: false,
    registration: false,
    history: false,
    topUp: false,
    out: false
})
    .on(toggleLogin, (state, newState: boolean) => (
        {
            ...state,
            login: newState
        }
    ))
    .on(toggleRegistration, (state, newState: boolean) => (
        {
            ...state,
            registration: newState
        }
    ))
    .on(toggleHistory, (state, newState: boolean) => (
        {
            ...state,
            history: newState
        }
    ))
    .on(toggleTopUp, (state, newState: boolean) => (
        {
            ...state,
            topUp: newState
        }
    ))
    .on(toggleOut, (state, newState: boolean) => (
        {
            ...state,
            out: newState
        }
    ))