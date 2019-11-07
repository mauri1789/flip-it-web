import { Injectable } from '@angular/core';
import { Cognito } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	constructor() {
	}
	userLogged():boolean {
		return false
	}
	cognitoUrl (action) {
		let { domain, redirectUrl, clientId } = Cognito
		return `https://${domain}/${action}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`
	}
	getLoginUrl() {
		return this.cognitoUrl('login')
	}
	getSignupUrl() {
		return this.cognitoUrl('signup')
	}
}
