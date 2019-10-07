import { createReducer, on, Action } from "@ngrx/store";
import { setCards, addCard, deleteCard } from "../actions/card.actions";
import { CardsSummary } from "../store.models";

export const initialState = null

const _cardReducer = createReducer(
   initialState,
   on(setCards, (_, payload) => payload)
)

export function cardReducer(state: CardsSummary | null, action:Action) {
   return _cardReducer(state, action)
}
