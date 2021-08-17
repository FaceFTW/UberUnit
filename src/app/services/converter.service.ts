import { Injectable } from '@angular/core';

export interface ConvResult {
  unitSet: number;
  inputVal: number;
  inputUnit: number;
  outputUnit: number;
  outputVal: number;
}

//lengthConvMatrix[fromUnit][toUnit]
export const lengthConvMatrix: number[][] = [
  [
    1, 1000, 100000, 1000000, 1000000000, 1000000000000, 39370.1, 3280.84,
    1093.61, 0.621371, 0.539957,
  ], //from Kilometers
  [
    0.001, 1, 100, 1000, 1000000, 1000000000, 39.3701, 3.28084, 1.09361,
    0.000621371, 0.000539957,
  ], //from Meters
  [
    0.00001, 0.01, 1, 10, 10000, 10000000, 0.393701, 0.0328084, 0.0109361,
    0.00000621371, 0.00000539957,
  ], //from centimeters
  [
    0.000001, 0.001, 0.1, 1, 1000, 1000000, 0.0393701, 0.00328084, 0.00109361,
    0.000000621371, 0.000000539957,
  ], //from millimeters
  [
    0.000000001, 0.000001, 0.0001, 0.001, 1, 1000, 0.0000393701, 0.00000328084,
    0.00000109361, 0.000000000621371, 0.000000539957,
  ], //from micrometers
  [
    0.000000000001, 0.000000001, 0.0000001, 0.000001, 0.000001, 0.001,
    0.0000000393701, 0.00000000328084, 0.00000000109361, 0.000000000000621371,
    0.000000539957,
  ], //from nanometers
  [
    0.0000254, 0.0254, 2.54, 25.4, 25400, 25400000, 1, 0.083333333,
    0.02777777778, 0.000015783, 0.000013715,
  ], //from inches
  [
    0.0003048, 0.3048, 30.48, 304.8, 3048000, 3048000000, 12, 1, 0.333333333,
    0.000189394, 0.000164579,
  ],
];

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
    console.log('outResult :>> ', outResult);
    return {
      unitSet: 1,
      inputVal: inVal,
      inputUnit: inUnit,
      outputVal: outResult,
      outputUnit: outUnit,
    };
  }
}
