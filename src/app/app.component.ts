import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from './services/session.service';
import { Store, select } from "@ngrx/store";
import { DecksSummary, UserSession } from './store.models';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	userSession$: Observable<UserSession>
	title = 'flip-it-web';
	constructor(
		private router: Router,
      private session: SessionService,
      private localStorageService: LocalStorageService,
		private store: Store<{decksSummary: DecksSummary, userSession: UserSession}>
	) {
		this.session.userLogged()
      this.userSession$ = this.store.pipe(select("userSession"))
	}
	goToLogin() {
		window.location.href = this.session.getLoginUrl()
	}
	goToSignup() {
		window.location.href = this.session.getSignupUrl()
	}
}
