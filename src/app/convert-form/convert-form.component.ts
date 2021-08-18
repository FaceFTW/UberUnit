import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
	ConverterService,
	lengthConvMatrix,
} from '../services/converter.service';

export interface Unit {
	id: number;
	val: string;
	latex: string;
}
export interface UnitSet {
	id: number;
	val: string;
	list: Unit[];
}

export const lengthUnits: Unit[] = [
	{ id: 0, val: 'kilometers', latex: 'km' },
	{ id: 1, val: 'meters', latex: 'm' },
	{ id: 2, val: 'centimeters', latex: 'cm' },
	{ id: 3, val: 'millimeters', latex: 'mm' },
	{ id: 4, val: 'micrometers', latex: '\\mu m' },
	{ id: 5, val: 'nanometers', latex: 'nm' },
	{ id: 6, val: 'inches', latex: 'in' },
	{ id: 7, val: 'feet', latex: 'ft' },
	{ id: 8, val: 'yards', latex: 'yd' },
	{ id: 9, val: 'miles', latex: 'mi' },
	{ id: 10, val: 'nautical_miles', latex: 'sm' },
];

export const areaUnits: any = [
	{ id: 0, val: 'meterssqu', latex: 'm^2' },
	{ id: 1, val: 'cmeterssqu', latex: 'cm^2' },
];

export const unitSetList: UnitSet[] = [
	{ id: 0, val: 'Length', list: lengthUnits },
	{ id: 1, val: 'Area', list: areaUnits },
];
@Component({
	selector: 'app-convert-form',
	templateUrl: './convert-form.component.html',
	styleUrls: ['./convert-form.component.scss'],
})
export class ConvertFormComponent implements OnInit {
	currentUnitSet: number = 0;
	input1: number = 0;
	input1Unit: number = 0;
	input2: number = 0;
	input2Unit: number = 1;

	//Constant References
	internalUnitSetList = unitSetList;

	constructor(private convServ: ConverterService) {}

	ngOnInit(): void {}

	doConvert() {
		console.log('doConvert Call');
		//pass inputs to the converter service, get the desired results back
		let convResult;
		switch (this.currentUnitSet) {
			case 0:
				convResult = this.convServ.doLengthConversion(
					this.input1,
					this.input1Unit,
					this.input2Unit
				);
				console.log('convResult :>> ', convResult);
				break;
		}

		if (convResult) {
			this.input2 = convResult.outputVal;
		}
	}
	swapVals() {}
	addfavorite() {}
}
