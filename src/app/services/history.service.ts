import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
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
	id: string | null;
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
	historyCollection: AngularFirestoreCollection<HistoryStruct>;

	constructor(private firestore: AngularFirestore, private auth: AuthService) {
		this.historyCollection = firestore.collection(FIRESTORE_COLLECTION);
	}

	//Adds an item to the history
	public addHistoryItem(hStruct: HistoryStruct): void {
		this.historyCollection.add(hStruct);
	}

	public deleteHistoryItem(id: string) {
		if (id) {
			this.firestore
				.doc<HistoryStruct>(FIRESTORE_COLLECTION + '/' + id)
				.delete();
		}
	}
}
