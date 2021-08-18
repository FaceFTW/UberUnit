import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
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
	private favoritesCollection: AngularFirestoreCollection<Favorite>;
	favorites$: Observable<Favorite[]>;

	constructor(private auth: AuthService, private firestore: AngularFirestore) {
		this.favoritesCollection = firestore.collection(FIRESTORE_COLLECTION);
		this.favorites$ = firestore
			.collection<Favorite>('favorites', (ref) =>
				ref
					.orderBy(CREATED_DATE_FIELD, 'desc')
					.where(FIELD_UID, '==', auth.userUid)
			)
			.valueChanges();
	}

	addFavorite(item: Favorite) {
		this.favoritesCollection.add(item);
	}

	deleteFavorite(id: string) {
		if (id) {
			this.firestore.doc<Favorite>(FIRESTORE_COLLECTION + '/' + id).delete();
		}
	}

	async getInitialQuery() {
		let favArray: Favorite[] = [];
		const initQuery = await this.firestore
			.collection<Favorite>('favorites', (ref) =>
				ref
					.orderBy(CREATED_DATE_FIELD, 'desc')
					.where(FIELD_UID, '==', this.auth.userUid)
			)
			.get()
			.toPromise()
			.then((queryResult) => {
				queryResult.forEach((item) => {
					favArray.push(item.data());
				});
			});

			return favArray;
	}
}
