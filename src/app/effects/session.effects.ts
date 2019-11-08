import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { JwtHelperService } from "@auth0/angular-jwt";
import { SessionService } from "../services/session.service";
import { setSession, exchangeCode, refreshToken } from "../actions/session.actions";
import { UserSession } from '../store.models'

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
      const jwt = new JwtHelperService();
      this.userSession$ = createEffect(() =>
         this.actions$.pipe(
            ofType(exchangeCode),
            exhaustMap(action =>
               this.sessionService.codeForToken(action.code).pipe(
                  map(tokens => {
                     let {access_token, expires_in, id_token, refresh_token} = tokens as TokenEnpointData
                     // const epochNow = (new Date).getTime()/1000;
                     const decodedToken = jwt.decodeToken(access_token);
                     const data = jwt.decodeToken(id_token);
                     // const isExpired = jwt.isTokenExpired(access_token);
                     let {exp: expiration} = decodedToken
                     return {
                        refreshToken: refresh_token,
                        token: access_token,
                        expires: expiration,
                        email: data.email
                     }
                  }),
                  map(tokens => setSession({userSession: tokens})),
                  // tap(tokens => this.store.dispatch(action))
               )
            )
         )
      )
   }
}