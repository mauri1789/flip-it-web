import { createReducer, on, Action } from "@ngrx/store";
import { setCards, setEditable, loadingCards } from "../actions/card.actions";
import { CardsSummary } from "../store.models";

export const initialState = {
   deckName: '--',
   cards: null
}

const _cardReducer = createReducer(
   initialState,
   on(setCards, (_, payload) => payload),
   on(setEditable, (state, {cardIndex, editable = true}) => {
      state.cards[cardIndex].editable = editable
      return {...state}
   }),
   on(loadingCards, (state,_) => {
      state.cards = null
      return {...state}
   })
)

export function cardReducer(state: CardsSummary, action:Action) {
   return _cardReducer(state, action)
}
