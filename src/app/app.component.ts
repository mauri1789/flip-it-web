import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from './services/session.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private router: Router,
		private session: SessionService
	) { }
	title = 'flip-it-web';
	goToLogin() {
		window.location.href = this.session.getLoginUrl()
	}
	goToSignup() {
		window.location.href = this.session.getSignupUrl()
	}
}
