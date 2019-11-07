import { Injectable } from '@angular/core';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	CognitoUserSession,
	AuthenticationDetails
} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	userPoolId = 'us-east-2_RgHEA6K8Z'
	clientId = '5gtlc3tvnk98ot9fja5mfohvp8'
	authDomain = 'auth.mauridev.net'
	redirectUrl = 'https://flip.mauridev.net'
	// redirectUrl = 'http://localhost:4200/' 
	poolData
	constructor() {
		this.poolData = {
			ClientId: this.clientId,
			UserPoolId: this.userPoolId
		}
	}
	userLogged():boolean {
		let userPool = new CognitoUserPool(this.poolData);
		let cognitoUser = userPool.getCurrentUser();
		console.log(cognitoUser)
		console.log(localStorage)
		return false
	}
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
