interface DecksSummary {
    userName: string
    totalDecks: number
    totalCards?: number
    lastStudied?: string
    decks?: Deck[]
}
interface Deck {
    deckName: string
    cardCount: number
    dateCreated: string
    lastStudied: string
}
interface Card {
    front: string;
    back: string;
}

export {
    DecksSummary,
    Deck,
    Card
}
