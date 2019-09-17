interface UserInfo {
    userName: string
    totalDecks: number
    totalCards: number
    lastStudied: string
    decks?: Deck[]
}
interface Deck {
    deckName: string
    cardCount: number
    dateCreated: string
    lastStudied: string
}

export {
    UserInfo,
    Deck
}
