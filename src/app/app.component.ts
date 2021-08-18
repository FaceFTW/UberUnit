import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'UberUnit-Code';

	constructor(private auth: AuthService) {}

	ngOnInit() {
		//In order for the history/favorites feature to work, we need to perform anonymous auth
		//all we need is a UID
		if (!this.auth.isAuth) {
			this.auth.doSignInAnon();
		}
	}

	//encapsulated getters for the authservices
	getIsAuth() {
		return this.auth.isAuth;
	}

	getIsAnon() {
		return this.auth.isAnon;
	}

	doOAuthSignIn() {
		this.auth.doSignInStandardOAuth();
	}

	doLogout() {
		this.auth.doLogout();
	}
}
