import { createReducer, on, Action } from "@ngrx/store";
import { setSession } from "../actions/session.actions";
import { UserSession } from "../store.models";
import { LocalStorageService } from '../services/local-storage.service';

let userSession = (new LocalStorageService).get('flipUserSession');

var [refreshToken, token, expires, email] = [null, null, null, null]
if ( userSession ) {
   var { refreshToken, token, expires, email } = userSession
}

export const initialState:UserSession = {
   refreshToken: refreshToken,
   token: token,
   expires: expires,
   email: email
}

const _sessionReducer = createReducer(
   initialState,
   on(setSession, (_, payload) => payload.userSession)
)

export function sessionReducer(state: UserSession | null, action:Action) {
   return _sessionReducer(state, action)
}
