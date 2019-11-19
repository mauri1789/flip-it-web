import { createAction, props } from "@ngrx/store";
import { UserSession } from "../store.models";

interface getTokenI {
	code?: string,
	token?: string
}


const refreshSession = createAction('[Session Store] refreshSession', props<{userSession: UserSession}>())
const setSession = createAction('[Session Store] setSession', props<{userSession: UserSession}>())
const logout = createAction('[Session Logout] logout')

const sessionRequest = createAction(
	'[Session AWS API] sessionRequest',
	props<{request: string, data?:getTokenI}>()
)

export {
	sessionRequest,
	refreshSession,
	setSession,
	logout
}
