import { LadderStore, LadderFetch } from './ladderTypes';
import $api, { API_URL } from '../../http/index';
import { createEffect, createEvent, createStore } from 'effector';

export const getLadderBet = createEvent<number>()
export const changeIsLoading = createEvent<boolean>()
export const reset = createEvent()

export const createGame = createEffect(async (data: LadderFetch) => {
    const res = await $api.post(`${API_URL}/ladder/create`, data)
    return res
})
export const calculationGame = createEffect(async (data: LadderFetch) => {
    const res = await $api.post(`${API_URL}/ladder/calculation`, data)
    return res
})
export const endGame = createEffect(async (data: LadderFetch) => {
    const res = await $api.post(`${API_URL}/ladder/end`, data)
    return res
})

export const $ladderStore = createStore<LadderStore>({
    gameStatus: 'start',
    ladderBet: 1,
    isFail: false,
    activeСell: [],
    stone: null,
    gameId: null,
    isLoading: false,
})
    .on(createGame.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.newGameStatus,
            gameId: res.data.gameId,
            activeСell: res.data.nums

        }
    ))
    .on(calculationGame.doneData, (state, res) => (
        {
            ...state,
            activeСell: res.data.nums,
            gameStatus: res.data.newGameStatus,
            stone: res.data.stone,
            isFail: res.data.isFail,
        }
    ))
    .on(endGame.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.newGameStatus,
            gameId: null,
        }
    ))
    .on(getLadderBet, (state, newBet) => (
        {
            ...state,
            ladderBet: newBet
        }
    ))
    .on(changeIsLoading, (state, newStatus) => (
        {
            ...state,
            isLoading: newStatus
        }
    ))
    .on(reset, (state) => (
        {
            ...state,
            isFail: false,
            activeСell: []
        }
    ))
