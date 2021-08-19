import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
	ConverterService,
} from '../services/converter.service';
import {
	Favorite,
	FavoritesService,
	UID_FIELD,
	UNIT_FROM_FIELD,
	UNIT_SET_FIELD,
	UNIT_TO_FIELD,
} from '../services/favorites.service';
import { HistoryService, HistoryStruct } from '../services/history.service';
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

		this.histServ.history$.subscribe((histList) => {
			this.historyList = histList;
		});

		//Some ngModel stuff to properly update the selectors
		of(this.currentUnitSet).subscribe((val) => {});
	}

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
		}

		if (convResult) {
			this.input2 = convResult.outputVal;
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

	changetoFavorite(fav: Favorite) {
		this.currentUnitSet = fav[UNIT_SET_FIELD];
		this.input1Unit = fav[UNIT_FROM_FIELD];
		this.input2Unit = fav[UNIT_TO_FIELD];
	}
}
