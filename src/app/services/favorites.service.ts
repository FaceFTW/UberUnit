import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	QuerySnapshot,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { FIELD_UID } from './history.service';

export const UID_FIELD = 'uid';
export const UNIT_SET_FIELD = 'unitSet';
export const UNIT_FROM_FIELD = 'fromUnit';
export const UNIT_TO_FIELD = 'toUnit';
export const CREATED_DATE_FIELD = 'createdDate';
export const FIRESTORE_COLLECTION = 'favorites';

export interface Favorite {
	id: string | null;
	[UID_FIELD]: string;
	[UNIT_SET_FIELD]: number;
	[UNIT_FROM_FIELD]: number;
	[UNIT_TO_FIELD]: number;
	[CREATED_DATE_FIELD]: firebase.firestore.Timestamp;
}

@Injectable({
	providedIn: 'root',
})
export class FavoritesService {
	favoritesCollection: AngularFirestoreCollection<Favorite>;

	constructor(private auth: AuthService, private firestore: AngularFirestore) {
		this.favoritesCollection = firestore.collection(FIRESTORE_COLLECTION);
	}

	addFavorite(item: Favorite) {
		this.favoritesCollection.add(item);
	}

	deleteFavorite(id: string) {
		if (id) {
			this.firestore.doc<Favorite>(FIRESTORE_COLLECTION + '/' + id).delete();
		}
	}

}
