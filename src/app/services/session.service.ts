import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cognito } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	constructor(private http: HttpClient) {
	}
	userLogged():boolean {
		return false
	}
	codeForToken (code: string) {
		let {
			domain,
			clientId,
			redirectUrl
      } = Cognito
      let grant_type = "authorization_code"
		let url = `https://${domain}/oauth2/token`

		let body = new URLSearchParams();
		body.set('grant_type', grant_type);
		body.set('client_id', clientId);
		body.set('redirect_uri', redirectUrl);
		body.set('code', code);

		let httpOptions = {
			headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})
		};
      return this.http.post(url, body.toString(), httpOptions)
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
