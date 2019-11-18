import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { fpDomain } from '../../environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take, concatMap, finalize } from "rxjs/operators";
import { SessionService } from './session.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, EMPTY, of } from 'rxjs';
import { UserSession } from '../store.models';
import { sessionRequest } from '../actions/session.actions';
import { API } from '../app-constants';


@Injectable({
   providedIn: 'root'
})
export class RequestService {
   httpOptions:any;
   token: string;
   userSession$: Observable<UserSession>
   constructor(
      private http: HttpClient,
      private sessionService:SessionService,
      private store: Store<any>
   ) {
      this.userSession$ = this.sessionService.userSession$;
      this.userSession$.subscribe(({token}) => {
         this.token = token
         this.httpOptions = {
            headers: new HttpHeaders({'Authorization':  `Bearer ${token}`})
         };
      })
   }
   get<DataType>(url: Array<string>) {
      let fullUrl = this.getFullUrl(url)
      let request = this.http
         .get(fullUrl, this.httpOptions)
         .pipe(map(response => (response as any) as DataType))
         return this.verifyToken().pipe(concatMap(() => request))
   }
   put(url: Array<string>, body) {
      let fullUrl = this.getFullUrl(url)
      return this.http.put(fullUrl, body, this.httpOptions)
   }
   delete(url: Array<string>) {
      let fullUrl = this.getFullUrl(url);
      return this.http.delete(fullUrl, this.httpOptions)
   }
   getFullUrl (url) {
      url.unshift(fpDomain)
      return url.join('/')
   }
   verifyToken() {
      let jwt = new JwtHelperService()
      return this.userSession$.pipe(
         take(1),
         concatMap(({token, refreshToken}) => {
            if ( jwt.isTokenExpired(token) && token != null) {
               this.store.dispatch(sessionRequest({request: API.sessionRefreshToken, data:{token: refreshToken}}))
               return this.userSession$.pipe(take(2))
            }
            return of("")
         })
      )
   }
}
