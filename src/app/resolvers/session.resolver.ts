import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cognito } from '../app-constants'
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let { code } = route.queryParams
    if ( code ) {
      let { domain, clientId, redirectUrl} = Cognito
      let url = `https://${domain}/oauth2/token`
      let body = {
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_url: redirectUrl,
        code
      }
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded'
        })
      };
      let tokenRequest = this.http.post(url, body, httpOptions)
      tokenRequest = tokenRequest.pipe(
        map(tokens => {
          console.log(tokens)
          return "random string"
        })
      )
      return tokenRequest
    }
    console.log(state)
    console.log("crazy")
    return of('hi world')
  }
  constructor(private http: HttpClient) { }
}
