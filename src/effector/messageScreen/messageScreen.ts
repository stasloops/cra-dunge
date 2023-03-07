import { createEvent, createStore } from 'effector';

export const getError = createEvent<string>()
export const deleteError = createEvent()

export const $messageStore = createStore<any>({
    errors: []
})
    .on(getError, (state, text) => (
        {
            ...state,
            errors: [...state.errors, { text }]

        }
    ))
    .on(deleteError, (state, text) => (
        {
            ...state,
            errors: []

        }
    ))