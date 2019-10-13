import { createAction, props } from "@ngrx/store";
import { CardsSummary } from "../store.models";

const setCards = createAction('[Card Component] setCards', props<CardsSummary>())
const addCard = createAction('[Card Component] addCard', props<{deckKey: string}>())
const deleteCard = createAction('[Card Component] deleteCard', props<{deckKey: string}>())

const loadingCards = createAction('[Card Component] loadingCards')

const setEditable = createAction('[Card Component] setEditable', props<{cardIndex: number, editable?: boolean}>())

const loadCards = createAction('[Card API Request]', props<{userId: string, deckId: string}>())

export {
    setCards,
    addCard,
    deleteCard,
    loadCards,
    setEditable,
    loadingCards
}
