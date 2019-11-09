import { createReducer, on, Action } from "@ngrx/store";
import { setSession, logout } from "../actions/session.actions";
import { UserSession } from "../store.models";
import { LocalStorageService } from '../services/local-storage.service';

let userSession = (new LocalStorageService).get('flipUserSession');

var [refreshToken, token, expires, email] = [undefined, undefined, undefined, undefined]
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
   on(setSession, (_, payload) => payload.userSession),
   on(logout, () => emptySession())
)

let emptySession = () => ({
   token: null,
   refreshToken: null,
   expires: null,
   email: null
})

export function sessionReducer(state: UserSession | null, action:Action) {
   return _sessionReducer(state, action)
}
