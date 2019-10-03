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
}

export {
    DecksSummary,
    CardsSummary,
    Deck,
    Card
}
