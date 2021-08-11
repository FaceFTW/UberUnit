import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export const FIELD_UNIT_SET = 'unitSet';
export const FIELD_INPUT_VAL = 'inputVal';
export const FIELD_INPUT_UNIT = 'inputUnit';
export const FIELD_OUTPUT_VAL = 'outputVal';
export const FIELD_OUTPUT_UNIT = 'outputUnit';
export const FIELD_CREATEDTIME = 'createdTime';
export const FIELD_LATEX_STRING = 'latexString';
export const FIELD_UID = 'uid';

export interface HistoryStruct {
  id: bigint;
  unitSet: number;
  inputUnit: number;
  inputVal: number;
  outputUnit: number;
  outputVal: number;
  latexString: string;
}


@Injectable({
  providedIn: 'root',
})


export class HistoryService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  //Adds an item to the history
}
