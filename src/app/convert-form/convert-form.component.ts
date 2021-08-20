import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConverterService } from '../services/converter.service';
import {
	Favorite,
	FavoritesService,
	UID_FIELD,
	UNIT_FROM_FIELD,
	UNIT_SET_FIELD,
	UNIT_TO_FIELD,
} from '../services/favorites.service';
import {
	FIELD_INPUT_UNIT,
	FIELD_INPUT_VAL,
	FIELD_OUTPUT_UNIT,
	FIELD_OUTPUT_VAL,
	FIELD_UNIT_SET,
	HistoryService,
	HistoryStruct,
} from '../services/history.service';
import firebase from 'firebase/app';

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
	{ id: 6, val: 'miles', latex: 'mi' },
	{ id: 7, val: 'nautical_miles', latex: 'sm' },
	{ id: 8, val: 'yards', latex: 'yd' },
	{ id: 9, val: 'feet', latex: 'ft' },
	{ id: 10, val: 'inches', latex: 'in' },
];

export const areaUnits: any = [
	{ id: 0, val: 'kmsqu', latex: 'km^2' },
	{ id: 1, val: 'meterssqu', latex: 'm^2' },
	{ id: 2, val: 'milessqu', latex: 'mi^2' },
	{ id: 3, val: 'yardsqu', latex: 'yd^2' },
	{ id: 4, val: 'feetsqu', latex: 'ft^2' },
	{ id: 5, val: 'inchsqu', latex: 'in^2' },
	{ id: 6, val: 'hectare', latex: 'ha' },
	{ id: 7, val: 'acre', latex: 'ac' },
];

export const speedUnits: Unit[] = [
	{ id: 0, val: 'mph', latex: 'mph' },
	{ id: 1, val: 'feetsecs', latex: 'ft/s' },
	{ id: 2, val: 'kmhours', latex: 'km/h' },
	{ id: 3, val: 'meterssecs', latex: 'm/s' },
	{ id: 4, val: 'knots', latex: 'kn' },
];

export const pressureUnits: Unit[] = [
	{ id: 0, val: 'bar', latex: 'bar' },
	{ id: 1, val: 'pascal', latex: 'pa' },
	{ id: 2, val: 'psi', latex: 'psi' },
	{ id: 3, val: 'atm', latex: 'atm' },
	{ id: 4, val: 'torr', latex: 'torr' },
];

export const tempUnits: Unit[] = [
	{ id: 0, val: 'farenheit', latex: '\\degree F' },
	{ id: 1, val: 'celcesius', latex: '\\degree C' },
	{ id: 2, val: 'kelvin', latex: 'K' },
];

export const unitSetList: UnitSet[] = [
	{ id: 0, val: 'Length', list: lengthUnits },
	{ id: 1, val: 'Area', list: areaUnits },
	{ id: 2, val: 'Speed', list: speedUnits },
	{ id: 3, val: 'Pressure', list: pressureUnits },
	{ id: 4, val: 'Temperature', list: tempUnits },
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

	favoritesList: Favorite[] = [];
	historyList: HistoryStruct[] = [];

	//Constant References
	internalUnitSetList = unitSetList;
	arrowString = ' \\rightarrow ';

	constructor(
		private convServ: ConverterService,
		private favServ: FavoritesService,
		private histServ: HistoryService,
		private auth: AuthService
	) {
		this.favServ.favoritesCollection
			.valueChanges({
				idField: 'id',
			})
			.subscribe((list) => {
				this.favoritesList = [];
				list.forEach((item) => {
					if (item[UID_FIELD] == this.auth.userUid) {
						this.favoritesList.push(item);
					}
				});
			});

		this.histServ.historyCollection
			.valueChanges({
				idField: 'id',
			})
			.subscribe((list) => {
				this.historyList = [];
				list.forEach((item) => {
					if (item[UID_FIELD] == this.auth.userUid) {
						this.historyList.push(item);
					}
				});
			});
	}

	//Some ngModel stuff to properly update the selectors

	ngOnInit(): void {}

	doConvert() {
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
			case 1:
				convResult = this.convServ.doAreaConversion(
					this.input1,
					this.input1Unit,
					this.input2Unit
				);
				console.log('convResult :>> ', convResult);
				break;
			case 2:
				convResult = this.convServ.doSpeedConversion(
					this.input1,
					this.input1Unit,
					this.input2Unit
				);
				console.log('convResult :>> ', convResult);
				break;
			case 3:
				convResult = this.convServ.doPressureConversion(
					this.input1,
					this.input1Unit,
					this.input2Unit
				);
				console.log('convResult :>> ', convResult);
				break;
			case 4:
				convResult = this.convServ.doTempConversion(
					this.input1,
					this.input1Unit,
					this.input2Unit
				);
				console.log('convResult :>> ', convResult);
				break;
		}

		if (convResult) {
			this.input2 = convResult;
		}
	}

	swapVals() {
		let temp = this.input1;
		let tempunit = this.input1Unit;
		this.input1 = this.input2;
		this.input1Unit = this.input2Unit;
		this.input2 = temp;
		this.input2Unit = tempunit;
	}

	addFavorite() {
		let favItem: Favorite = {
			id: null,
			[UID_FIELD]: this.auth.userUid,

			unitSet: this.currentUnitSet,
			fromUnit: this.input1Unit,
			toUnit: this.input2Unit,
			createdDate: new firebase.firestore.Timestamp(+new Date() / 1000, 0),
		};
		this.favServ.addFavorite(favItem);
	}

	//Favorites Functionality

	invokeFavDelete(id: string | null) {
		if (id) {
			this.favServ.deleteFavorite(id);
		}
	}

	invokeHistDelete(id: string | null) {
		if (id) {
			this.histServ.deleteHistoryItem(id);
		}
	}

	changetoFavorite(fav: Favorite) {
		this.currentUnitSet = fav[UNIT_SET_FIELD];
		this.input1Unit = fav[UNIT_FROM_FIELD];
		this.input2Unit = fav[UNIT_TO_FIELD];
	}

	changetoHistory(hist: HistoryStruct) {
		this.currentUnitSet = hist[FIELD_UNIT_SET];
		this.input1 = hist[FIELD_INPUT_VAL];
		this.input1Unit = hist[FIELD_INPUT_UNIT];
		this.input2 = hist[FIELD_OUTPUT_VAL];
		this.input2 = hist[FIELD_OUTPUT_UNIT];
	}

	resetUnitSelectors(){
		this.input1Unit = 0;
		this.input2Unit = 1;
		this.input1 = 0;
		this.input2 = 0;
	}
}
