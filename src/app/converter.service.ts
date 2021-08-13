import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { lengthConvMatrix, unitSetList } from './convert-form/convert-form.component';

export interface ConvResult {
  unitSet: number;
  inputVal: number;
  inputUnit: number;
  outputUnit: number;
  outputVal: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor() {}

  public doLengthConversion(
    inVal: number,
    inUnit: number,
    outUnit: number
  ): ConvResult {
    //Luckily, we have a nice programmed array for this
    let convertFactor = lengthConvMatrix[inUnit][outUnit];
    let outResult = Number(inVal) * convertFactor;
    return {
      unitSet: 1,
      inputVal: inVal,
      inputUnit: inUnit,
      outputVal: outResult,
      outputUnit: outUnit,
    };
  }
}
