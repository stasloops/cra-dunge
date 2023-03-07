import $api, { API_URL } from '../../http/index';
import { createEffect, createEvent, createStore } from 'effector';

export const getDiceBet = createEvent<number>()
export const getDiceRange = createEvent<number>()
export const changeIsLoading = createEvent<boolean>()

export const createGame = createEffect(async (data: any) => {
    const res = await $api.post(`${API_URL}/dice/create`, data)
    return res
})

export const $diceStore = createStore<any>({
    diceBet: 1,
    gameId: null,
    isLoading: false,
    droppedNumber: 0,
    selectPercent: null,
    range: null,
})
    .on(createGame.doneData, (state, res) => (
        {
            ...state,
            gameId: res.data.gameId,
            droppedNumber: res.data.droppedNumber,
        

        }
    ))
    .on(getDiceBet, (state, newBet) => (
        {
            ...state,
            diceBet: newBet
        }
    ))
    .on(getDiceRange, (state, range) => (
        {
            ...state,
            range: range
        }
    ))
    .on(changeIsLoading, (state, newStatus) => (
        {
            ...state,
            isLoading: newStatus
        }
    ))
