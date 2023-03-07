import $api, { API_URL } from '../../http/index';
import { createEffect, createEvent, createStore } from 'effector';
import { CoinStore, CoinFetch } from './coinTypes';

export const getCoinBet = createEvent<number>()
export const changeIsLoading = createEvent<boolean>()

export const createGame = createEffect(async (data: CoinFetch) => {
    const res = await $api.post(`${API_URL}/coin/create`, data)
    return res
})
export const calculationGame = createEffect(async (data: CoinFetch) => {
    const res = await $api.post(`${API_URL}/coin/calculation`, data)
    return res
})
export const endGame = createEffect(async (data: CoinFetch) => {
    const res = await $api.post(`${API_URL}/coin/end`, data)
    return res
})
export const checkCoinGameStatus = createEffect(async (data: CoinFetch) => {
    const res = await $api.post(`${API_URL}/coin/status`, data)
    return res
})

export const $coinStore = createStore<CoinStore>({
    gameStatus: 'start',
    bet: 1,
    isWin: null,
    randomCoin: null,
    selectedCoin: null,
    gameId: null,
    isLoading: false
})
    .on(createGame.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.newGameStatus,
            gameId: res.data.gameId
        }
    ))
    .on(calculationGame.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.newGameStatus,
            isWin: res.data.isWin,
            randomCoin: res.data.randomCoin,

        }
    ))
    .on(endGame.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.newGameStatus,
            gameId: null,
            isWin: null,
            randomCoin: null
        }
    ))
    .on(checkCoinGameStatus.doneData, (state, res) => (
        {
            ...state,
            gameStatus: res.data.gameStatus,
            bet: res.data.bet,
            isWin: res.data.isWin,
            randomCoin: res.data.randomCoin,
            selectedCoin: res.data.selectedCoin
        }
    ))
    .on(getCoinBet, (state, newBet) => (
        {
            ...state,
            bet: newBet
        }
    ))
    .on(changeIsLoading, (state, newStatus) => (
        {
            ...state,
           isLoading: newStatus
        }
    ))