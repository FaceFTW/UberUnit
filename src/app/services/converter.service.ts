import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
	FIELD_CREATEDTIME,
	FIELD_INPUT_UNIT,
	FIELD_INPUT_VAL,
	FIELD_OUTPUT_UNIT,
	FIELD_OUTPUT_VAL,
	FIELD_UID,
	FIELD_UNIT_SET,
	HistoryService,
} from './history.service';

import firebase from 'firebase/app';

//lengthConvMatrix[fromUnit][toUnit]
export const lengthConvMatrix: number[][] = [
	[1,	1000,	1.00E+05,	1.00E+06,	1.00E+09,	1E+12,	0.621371528,	0.539957095,	1093.61,	3280.83,	39369.96], //from Kilometers
	[1.00E-03,1,100,1000,1.00E+06,1000000000,0.000621372,0.000539957,1.09361,3.28083,39.36996], //from Meters
	[1.00E-05,1.00E-02,1,10,100000,1.00E+07,6.21E-06,5.40E-06,0.010936139,0.032808417,0.393701], //from centimeters
	[1.00E-06,1.00E-03,0.1,1,1000,1000000,6.21E-07,5.40E-07,0.001093614,0.003280842,0.0393701], //from millimeters
	[1.00E-09,1.00E-06,1.00E-04,0.001,1,1000,6.21E-10,5.40E-10,1.09E-06,3.28E-06,3.94E-05], //from micrometers
	[1.00E-12,1.00E-09,1.00E-07,1.00E-06,0.001,1,6.21E-13,5.40E-13,1.09E-09,3.28E-09,3.94E-08], //from nanometers
	[1.60936151,1609.36151,160936.151,1609361.51,1609361510,1.60936E+12,1,0.868985696,1760.019149,5280.057446,63360.68936], //from mi
	[1.85202015,1852.02015,185202.015,1852020.15,1852020150,1.85202E+12,1.150791969,1,2025.393865,6076.181594,72914.17912], //from sm
	[0.00091441,0.914409949,91.44099487,914.4099487,914409.9487,914409948.7,0.000568188,0.000493742,1,3.00003264,36.00039168], //yd
	[0.0003048,0.304800098,30.48000975,304.8000975,304800.0975,304800097.5,0.000189394,0.000164581,0.33333696,1,12.00013056], //ft
	[2.54E-05,0.0254,2.54,25.4,25400,2.54E+07,1.58E-05,1.37E-05,0.02777808,0.08333424,1] //mi
];

export const areaConvMatrix: number[][] = [
	[1,1.00E+06,0.386102,1195989.555,10763906,1550002464,247.10528,99.99995894],
	[1.00E-06,1,3.86E-07,1.195989555,10.763906,1550.002464,0.000247105,1.00E-04],
	[2.58999,2589990.001,1,3097602.261,27878420.35,4014492531,640.0004672,258.9990001],
	[8.36E-07,0.836129099,3.23E-07,1,9.00001872,1296.002696,0.000206612,8.36E-05],
	[9.29E-08,0.092903,3.59E-08,0.111111,1,144,0.404686,9.29E-06],
	[6.45E-10,0.00064516,2.49E-10,0.000771605,0.00694444,1,1.59E-07,6.45E-08],
	[0.01,10000,0.00386102,11959.9,107639,1.55E+07,2.47105,1],
	[0.00404686,4046.86,0.0015625,4840,43560,6.27E+06,1,0.404686]
];

export const pressureConvMatrix:number[][] = [
	[1,1.00E+05,14.5038,0.986925051,750.0630391],
	[1.00E-05,1,0.000145038,9.87E-06,0.00750063],
	[0.068947698,6894.769761,1,0.068046087,51.7149],
	[14.5038,0.000145038,14.6959,1,759.9995213],
	[0.001333226,133.3226094,0.01933681,0.001315792,1]
];

export const speedConvMatrix:number[][]=[
	[1,1.46667,1.60934,0.44704,0.868976],
	[0.681818,1,1.09728,0.3048,0.592484],
	[0.621371,0.911344133,1,0.277778,0.539957236],
	[2.23694,1.09728,3.6,1,1.94384],
	[1.15078,1.68781,0.277778,0.514444,1]
];
@Injectable({
	providedIn: 'root',
})
export class ConverterService {
	constructor(private auth: AuthService, private hist: HistoryService) {}

	public doLengthConversion(
		inVal: number,
		inUnit: number,
		outUnit: number
	): number {
		//Luckily, we have a nice programmed array for this
		let convertFactor = lengthConvMatrix[inUnit][outUnit];
		let outResult = Number(inVal) * convertFactor;
		console.log('outResult :>> ', outResult);
		this.hist.addHistoryItem({
			id: null,
			[FIELD_UNIT_SET]: 0,
			[FIELD_INPUT_VAL]: inVal,
			[FIELD_INPUT_UNIT]: inUnit,
			[FIELD_OUTPUT_VAL]: outResult,
			[FIELD_OUTPUT_UNIT]: outUnit,
			[FIELD_UID]: this.auth.userUid,
			[FIELD_CREATEDTIME]: new firebase.firestore.Timestamp(
				+new Date() / 1000,	0),
		});
		return outResult;
	}


	public doAreaConversion(
		inVal: number,
		inUnit: number,
		outUnit: number
	): number {
		//Luckily, we have a nice programmed array for this
		let convertFactor = areaConvMatrix[inUnit][outUnit];
		let outResult = Number(inVal) * convertFactor;
		console.log('outResult :>> ', outResult);
		this.hist.addHistoryItem({
			id: null,
			[FIELD_UNIT_SET]: 1,
			[FIELD_INPUT_VAL]: inVal,
			[FIELD_INPUT_UNIT]: inUnit,
			[FIELD_OUTPUT_VAL]: outResult,
			[FIELD_OUTPUT_UNIT]: outUnit,
			[FIELD_UID]: this.auth.userUid,
			[FIELD_CREATEDTIME]: new firebase.firestore.Timestamp(
				+new Date() / 1000,	0),
		});
		return outResult;
	}

	public doSpeedConversion(
		inVal: number,
		inUnit: number,
		outUnit: number
	): number {
		//Luckily, we have a nice programmed array for this
		let convertFactor = speedConvMatrix[inUnit][outUnit];
		let outResult = Number(inVal) * convertFactor;
		console.log('outResult :>> ', outResult);
		this.hist.addHistoryItem({
			id: null,
			[FIELD_UNIT_SET]: 2,
			[FIELD_INPUT_VAL]: inVal,
			[FIELD_INPUT_UNIT]: inUnit,
			[FIELD_OUTPUT_VAL]: outResult,
			[FIELD_OUTPUT_UNIT]: outUnit,
			[FIELD_UID]: this.auth.userUid,
			[FIELD_CREATEDTIME]: new firebase.firestore.Timestamp(
				+new Date() / 1000,	0),
		});
		return outResult;
	}

	public doPressureConversion(
		inVal: number,
		inUnit: number,
		outUnit: number
	): number {
		//Luckily, we have a nice programmed array for this
		let convertFactor = pressureConvMatrix[inUnit][outUnit];
		let outResult = Number(inVal) * convertFactor;
		console.log('outResult :>> ', outResult);
		this.hist.addHistoryItem({
			id: null,
			[FIELD_UNIT_SET]: 3,
			[FIELD_INPUT_VAL]: inVal,
			[FIELD_INPUT_UNIT]: inUnit,
			[FIELD_OUTPUT_VAL]: outResult,
			[FIELD_OUTPUT_UNIT]: outUnit,
			[FIELD_UID]: this.auth.userUid,
			[FIELD_CREATEDTIME]: new firebase.firestore.Timestamp(
				+new Date() / 1000,	0),
		});
		return outResult;
	}

	public doTempConversion(inVal:number, inUnit: number, outUnit:number){
		let outResult = inVal;
		switch(inUnit){
			case 0:	//Farenheit
				switch(outUnit){
					case 0:
						outResult = outResult;	//Pass throuth
						break;
					case 1:
						outResult = (outResult-32)*(5/9)
							break;
					case 2:
						outResult = ((outResult-32)*(5/9)) +273.15
						break;
					default:
							break;
				}
				break;
			case 1: //Celseius
			switch(outUnit){
				case 0:
					outResult = (outResult*(9/5))+32;
					break;
				case 1:
					outResult = outResult;
						break;
				case 2:
					outResult = outResult + 273.15;
					break;
				default:
						break;
			}
					break;
			case 2: //Kelvin
			switch(outUnit){
				case 0:
					outResult = (outResult-273.15)*(9/5)+32;
					break;
				case 1:
					outResult = outResult-273.15;
						break;
				case 2:
					outResult = outResult;
					break;
				default:
						break;
			}
				break;
			default:
					break;
		}

		this.hist.addHistoryItem({
			id: null,
			[FIELD_UNIT_SET]: 4,
			[FIELD_INPUT_VAL]: inVal,
			[FIELD_INPUT_UNIT]: inUnit,
			[FIELD_OUTPUT_VAL]: outResult,
			[FIELD_OUTPUT_UNIT]: outUnit,
			[FIELD_UID]: this.auth.userUid,
			[FIELD_CREATEDTIME]: new firebase.firestore.Timestamp(
				+new Date() / 1000,	0),
		});
		return outResult;
	}



}
