import $api, { API_URL } from '../../http/index';
import { createEffect, createStore, createEvent } from 'effector';
import { GameStore, IGame } from './gameTypes';

export const getCategory = createEvent<string>('')

export const getFiltredGames = createEffect(async ({category = ''}) => {
    const res = await $api.get(`${API_URL}/game/${category}`)
    return res
})

export const $game = createStore<GameStore>({
    games: [],
    category: ''
})
    .on(getFiltredGames.doneData, (state, res) => (
        {
            ...state,
            games: res.data.newGames
        }
    ))
    .on(getCategory, (state, newCategory) => (
        {
            ...state,
            category: newCategory
        }
    ))