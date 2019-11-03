import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	userPool = 'us-east-2_ZyTMDBKf1'
	clientId = '1vbtqr9mbcusjtrd4cenhv9fgs'
	authDomain = 'auth.mauridev.net'
	redirectUrl = 'https://flip.mauridev.net'
  	constructor() {}
	cognitoUrl (action) {
		return `https://${this.authDomain}/${action}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUrl}`
	}
	getLoginUrl() {
		return this.cognitoUrl('login')
	}
	getSignupUrl() {
		return this.cognitoUrl('signup')
	}
}
