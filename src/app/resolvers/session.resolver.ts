import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from "@ngrx/store";
import { UserSession } from '../store.models';
import { Cognito } from '../app-constants';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take, map }         from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionResolver implements Resolve<Observable<any>> {
   userSession$;
  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   let { code } = route.queryParams
	if ( code ) {
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
      let tokenRequest = this.http.post(url, body.toString(), httpOptions)
      console.log("-----")
      tokenRequest = tokenRequest.pipe(
			map(tokens => {
				console.log(tokens)
				return "random string"
			})
      )
      return tokenRequest
	}
	return of('hi world')
	}
	constructor(
      private http: HttpClient,
      private store: Store<{userSession: UserSession}>
   ) {
      store.pipe(select('userSession')).subscribe(x => console.log(x))
   }
}
