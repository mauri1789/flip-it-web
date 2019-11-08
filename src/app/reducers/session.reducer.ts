import { createReducer, on, Action } from "@ngrx/store";
import { setSession } from "../actions/session.actions";
import { UserSession } from "../store.models";

export const initialState:UserSession = {
   refreshToken: null,
   token: null,
   expires: null,
   email: null
}

const _sessionReducer = createReducer(
   initialState,
   on(setSession, (_, payload) => payload.userSession)
)

export function sessionReducer(state: UserSession | null, action:Action) {
   return _sessionReducer(state, action)
}
