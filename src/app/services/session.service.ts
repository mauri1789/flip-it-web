import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cognito } from '../app-constants';
import { Store, select } from '@ngrx/store';
import { UserSession } from '../store.models';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
   userSession$: Observable<UserSession>
	constructor(
      private http: HttpClient,
      private localStorageService: LocalStorageService,
      private store: Store<{userSession: UserSession}>
      ) {
         this.userSession$ = this.store.pipe(select("userSession"))
         this.userSession$.subscribe(({token, refreshToken, email, expires}) => {
            if (token) {
               this.localStorageService.set("flipUserSession", {token, refreshToken, email, expires})
               const now = Math.floor((new Date).getTime()/1000);
               if (expires - now < 300) {
                  console.log("renew token")
               }
            }

         })

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
