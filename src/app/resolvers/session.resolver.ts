import { Injectable } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { UserSession } from '../store.models';
import { sessionRequest } from '../actions/session.actions';
import {
   Router, Resolve,
   RouterStateSnapshot,
   ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, EMPTY }  from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { API } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionResolver implements Resolve<Observable<any>> {
   userSession$;
  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   let { code } = route.queryParams
	if ( code ) {
      this.store.dispatch(sessionRequest({request: API.sessionGetToken, data: {code}}))
      this.userSession$.pipe(take(2), finalize(() => {
         this.router.navigate(['/decks'])
      })).subscribe()
      return EMPTY
	}
	return EMPTY
	}
	constructor(
      private router: Router,
      private store: Store<{userSession: UserSession}>
   ) {
      this.userSession$ = this.store.pipe(select("userSession"))
   }
}
