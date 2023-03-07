export type GameStore = {
    games?: IGame[]
    category?: string
}

export type IGame = {
    gameId?: string
    win?: boolean
    bet?: number
    reward?: number
    coeff?: number
}
