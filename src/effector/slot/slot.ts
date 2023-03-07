import $api, { API_URL } from '../../http/index';
import { createEffect, createEvent, createStore } from 'effector';

export const getSlotBet = createEvent<number>()
export const getSlotRange = createEvent<number>()
export const changeIsLoading = createEvent<boolean>()

export const createGame = createEffect(async (data: any) => {
    const res = await $api.post(`${API_URL}/dice/create`, data)
    return res
})

export const $slotStore = createStore<any>({
    slotBet: 1,
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
    .on(getSlotBet, (state, newBet) => (
        {
            ...state,
            slotBet: newBet
        }
    ))
    .on(getSlotRange, (state, range) => (
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
