import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of, Observable } from 'rxjs'
import { catchError, exhaustMap, map, tap, finalize } from 'rxjs/operators';

import { JwtHelperService } from "@auth0/angular-jwt";
import { SessionService } from "../services/session.service";
import { setSession, sessionRequest } from "../actions/session.actions";
import { UserSession } from '../store.models'
import { API } from '../app-constants';

interface TokenEnpointData {
   access_token: string
   expires_in: string
   id_token: string
   refresh_token: string
}

@Injectable()
export class SessionEffects {
   userSession$;
   constructor(
      private actions$: Actions,
      private sessionService: SessionService,
      private store: Store<{}>
   ) {
      this.userSession$ = createEffect(() =>
         this.actions$.pipe(
            ofType(sessionRequest),
            exhaustMap(({request, data}) => {
               let apiRequest$: Observable<any>;
               switch (request) {
                  case API.sessionGetToken:
                     apiRequest$ = this.sessionService
                        .codeForToken(data.code)
                        .pipe(
                           map(this.buildTokenObject),
                           map(tokens => setSession({userSession: tokens}))
                        )
                     break
                  case API.sessionRefreshToken:
                     break
               }
               return apiRequest$
            })
         )
      )
   }
   buildTokenObject (tokens) {
      const jwt = new JwtHelperService();
      let {access_token, expires_in, id_token, refresh_token} = tokens as TokenEnpointData
      const decodedToken = jwt.decodeToken(access_token);
      const data = jwt.decodeToken(id_token);
      // const isExpired = jwt.isTokenExpired(access_token);
      let {exp: expiration} = decodedToken
      return {
         refreshToken: refresh_token,
         token: id_token,
         expires: expiration,
         email: data.email,
         data: data
      }
   }
}