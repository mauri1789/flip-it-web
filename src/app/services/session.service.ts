import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cognito, API } from '../app-constants';
import { Store, select } from '@ngrx/store';
import { UserSession } from '../store.models';
import { Observable } from 'rxjs';
import { logout, sessionRequest } from '../actions/session.actions';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
	userSession$: Observable<UserSession>
	accessToken: string;
	httpOptions: any;
	constructor(
      private http: HttpClient,
      private localStorageService: LocalStorageService,
      private store: Store<{userSession: UserSession}>
      ) {
			this.userSession$ = this.store.pipe(select("userSession"))
         this.userSession$.subscribe(({token, refreshToken, email, expires}) => {
				this.accessToken = token
				if(token !== undefined) {
					this.localStorageService.set("flipUserSession", {token, refreshToken, email, expires})
				}
            if (token != null) {
               const now = Math.floor((new Date).getTime()/1000);
               if (expires - now < 300) {
                  console.log("renew token")
               }
            }

		 })
		 this.httpOptions = {
			headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})
		};
	}
	logout () {
		this.store.dispatch(logout())
		let { logoutUrl, clientId, domain } = Cognito
		return `https://${domain}/logout?client_id=${clientId}&logout_uri=${logoutUrl}`
	}
	userLogged():boolean {
		return this.accessToken != null
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

     	return this.http.post(url, body.toString(), this.httpOptions)
   }
   refreshToken (code: string) {
		let {
			domain,
			clientId,
			redirectUrl
		} = Cognito
		let grant_type = "refresh_token"
		let url = `https://${domain}/oauth2/token`

		let body = new URLSearchParams();
		body.set('grant_type', grant_type);
		body.set('client_id', clientId);
		body.set('redirect_uri', redirectUrl);
		body.set('refresh_token', code);

     	return this.http.post(url, body.toString(), this.httpOptions)
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
