import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { UserSession } from '../store.models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {
   userSession$: Observable<UserSession>
   constructor(private sessionService: SessionService) {
      this.userSession$ = this.sessionService.userSession$;
   }
   canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      return this.userSession$.pipe(
         map(session => session.token != null)
      )
   }
  
}
