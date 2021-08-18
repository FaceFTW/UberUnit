import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userUid: string = '';
	isAnon: boolean = false;
	isAuth:boolean = false;

	constructor(private fireauth: AngularFireAuth) {
		this.fireauth.user.subscribe((user) => {
			if (user) {
				this.userUid = user.uid;
				this.isAnon = user.isAnonymous;
				this.isAuth = true;
			}
		});
	}

	// doSignInLinkOAuth() {
	// 	if (this.isAnon) {
	// 		firebase.auth.;
	// 	}
	// }

	doSignInAnon() {
		this.fireauth.signInAnonymously().catch((err) => {
			if (err) {
				console.log('err :>> ', err);
			}
		});
	}

	doSignInStandardOAuth() {
		this.fireauth
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.catch((err) => {
				if (err) {
					console.log('err :>> ', err);
				}
			});
	}

	doLogout() {
		this.fireauth
			.signOut()
			.then(() => {
				console.log('fireauth.user :>> ', this.fireauth.user);
				this.isAuth = false;
			}).then(()=>{
				this.fireauth.signInAnonymously();
			})
			.catch((err) => {
				if (err) {
					console.log('err :>> ', err);
				}
			});
	}
}
