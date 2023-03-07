export type CoinStore = {
    gameStatus: 'start' | 'calculation' | 'end'
    bet: number
    isWin: null | boolean
    randomCoin: null | number
    selectedCoin: null | number
    gameId: null | string
    isLoading: boolean
} 

export type CoinFetch = {
    gameID?: string | null
    selectedCoin?: number
    bet?: number
}