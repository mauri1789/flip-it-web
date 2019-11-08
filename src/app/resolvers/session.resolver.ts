import { Injectable } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { UserSession } from '../store.models';
import { exchangeCode } from '../actions/session.actions';
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
      this.store.dispatch(exchangeCode({code: code}))
      return EMPTY
	}
	return EMPTY
	}
	constructor(
      private store: Store<{userSession: UserSession}>
   ) { }
}
