import { createAction, props } from "@ngrx/store";
import { Deck, DecksSummary } from "../store.models";

const setDecks = createAction('[Deck Component] setDecks', props<{decksSummary: DecksSummary}>())
const addDeck = createAction('[Deck Component] addDeck', props<Deck>())
const deleteDeck = createAction('[Deck Component] deleteDeck', props<Deck>())

const loadDecks = createAction('[Deck API Request] loadDecks', props<{userId: string}>())

export {
    setDecks,
    addDeck,
    deleteDeck,
    loadDecks
}
