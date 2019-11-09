import { createAction, props } from "@ngrx/store";
import { UserSession } from "../store.models";

const setSession = createAction('[Session Store] setSession', props<{userSession: UserSession}>())
const logout = createAction('[Session Logout] logout')

const exchangeCode = createAction('[Session TOKEN API] exchangeCode', props<{code: string}>())
const refreshToken = createAction('[Session TOKEN API] refreshToken', props<{token: string}>())

export {
	exchangeCode,
	refreshToken,
	setSession,
	logout
}
