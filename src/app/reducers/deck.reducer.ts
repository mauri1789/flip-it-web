import { createReducer, on, Action } from "@ngrx/store";
import { setDecks, addDeck, deleteDeck, loadingDecks } from "../actions/deck.actions";
import { DecksSummary } from "../store.models";

export const initialState:DecksSummary = {
   lastStudied: '--',
   totalDecks: 0,
   totalCards: 0,
   userName: '--',
   decks: null
}

const _deckReducer = createReducer(
   initialState,
   on(setDecks, (_, payload) => payload.decksSummary),
   on(loadingDecks, (state, _) => {
      state.decks = null
      return {...state}
   })
)

export function deckReducer(state: DecksSummary | null, action:Action) {
   return _deckReducer(state, action)
}
