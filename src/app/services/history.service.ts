import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { unitSetList } from '../convert-form/convert-form.component';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';

export const FIELD_UNIT_SET = 'unitSet';
export const FIELD_INPUT_VAL = 'inputVal';
export const FIELD_INPUT_UNIT = 'inputUnit';
export const FIELD_OUTPUT_VAL = 'outputVal';
export const FIELD_OUTPUT_UNIT = 'outputUnit';
export const FIELD_CREATEDTIME = 'createdTime';
export const FIELD_UID = 'uid';

const FIRESTORE_COLLECTION = 'convHistory';
export interface HistoryStruct {
	id: string;
	[FIELD_UID]: string;
	[FIELD_UNIT_SET]: number;
	[FIELD_INPUT_VAL]: number;
	[FIELD_INPUT_UNIT]: number;
	[FIELD_OUTPUT_VAL]: number;
	[FIELD_OUTPUT_UNIT]: number;
	[FIELD_CREATEDTIME]: firebase.firestore.Timestamp;
}

@Injectable({
	providedIn: 'root',
})
export class HistoryService {
	private historyCollection: AngularFirestoreCollection<HistoryStruct>;
	history$: Observable<HistoryStruct[]>;

	constructor(private firestore: AngularFirestore, private auth: AuthService) {
		this.historyCollection = firestore.collection(FIRESTORE_COLLECTION);
		this.history$ = firestore
			.collection<HistoryStruct>('convHistory', (ref) =>
				ref
					.orderBy(FIELD_CREATEDTIME, 'desc')
					.where(FIELD_UID, '==', auth.userUid)
			)
			.valueChanges();
	}

	//Adds an item to the history
	public addHistoryItem(hStruct: HistoryStruct): void {
		this.historyCollection.add(hStruct);
	}

	public deleteHistoryItem(id: string) {
		this.firestore.doc<HistoryStruct>(FIRESTORE_COLLECTION + '/' + id).delete();
	}
}
