interface DecksSummary {
    userName: string
    totalDecks: number
    totalCards?: number
    lastStudied?: string
    decks?: Deck[]
}
interface CardsSummary {
    deckName: string
    cards: Card[]
}
interface Deck {
    deckName: string
    cardCount: number
    dateCreated: string
    lastStudied: string
}
interface Card {
    front: string
    back: string
    pk?: string
    sk?: string
}
interface UserSession {
    refreshToken: string,
    token: string,
    expires: string,
    email: string
}

export {
    DecksSummary,
    CardsSummary,
    UserSession,
    Deck,
    Card
}
