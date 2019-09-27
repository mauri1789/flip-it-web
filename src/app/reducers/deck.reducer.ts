import { createReducer, on, Action } from "@ngrx/store";
import { setDecks, addDeck, deleteDeck } from "../actions/deck.actions";
import { DecksSummary } from "../store.models";

export const initialState = null

const _deckReducer = createReducer(
   initialState,
   on(setDecks, (_, payload) => payload.decksSummary)
)

export function deckReducer(state: DecksSummary | null, action:Action) {
   return _deckReducer(state, action)
}
