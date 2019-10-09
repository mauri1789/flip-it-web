import { createReducer, on, Action } from "@ngrx/store";
import { setCards, setEditable } from "../actions/card.actions";
import { CardsSummary } from "../store.models";

export const initialState = null

const _cardReducer = createReducer(
   initialState,
   on(setCards, (_, payload) => payload),
   on(setEditable, (state, {cardIndex, editable = true}) => {
      state.cards[cardIndex].editable = editable
      return {...state}
   })
)

export function cardReducer(state: CardsSummary | null, action:Action) {
   return _cardReducer(state, action)
}
