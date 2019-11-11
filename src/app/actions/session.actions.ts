import { createAction, props } from "@ngrx/store";
import { UserSession } from "../store.models";
import { API } from "../app-constants"

interface getTokenI {
	code: string
}


const setSession = createAction('[Session Store] setSession', props<{userSession: UserSession}>())
const logout = createAction('[Session Logout] logout')

const sessionRequest = createAction(
	'[Session AWS API] sessionRequest',
	props<{request: string, data?:getTokenI}>()
)

export {
	sessionRequest,
	setSession,
	logout
}
