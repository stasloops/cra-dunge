type Stone = {
    positionStone: number
    stoneIndex: number
}

export type LadderStore = {
    gameStatus: 'start' | 'calculation' | 'end'
    ladderBet: number
    isFail: boolean
    activeСell: number[]
    stone: null | Stone 
    gameId: null | string
    isLoading: boolean
}

export type LadderFetch = {
    gameID?: string | null
    selectedCell?: number
    bet?: number
}