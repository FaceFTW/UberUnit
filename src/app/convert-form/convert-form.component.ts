import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  convMatrix: number[][];
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

export const unitSetList: String[] = ['Length', 'Area', 'Volume'];
export const unitLists:Unit[][] = [lengthUnits];
@Component({
  selector: 'app-convert-form',
  templateUrl: './convert-form.component.html',
  styleUrls: ['./convert-form.component.scss'],
})
export class ConvertFormComponent implements OnInit {
  //This list is hardcoded for now, may move to a separate local JSON
  currentUnitSet = new FormControl(0);
  currentUnitList: Unit[] = unitLists[this.currentUnitSet.value];
  input1 = new FormControl('');
  input1Unit = new FormControl(0);
  input2 = new FormControl('');
  input2Unit = new FormControl(1);

  //Constant References
  internalUnitSetList = unitSetList;

  constructor(private convServ: ConverterService) {}

  ngOnInit(): void {}

  doConvert() {
    console.log('doConvert Call');
    //pass inputs to the converter service, get the desired results back
    let convResult;
    switch (this.currentUnitSet.value) {
      case 0:
        convResult = this.convServ.doLengthConversion(
          this.input1.value,
          this.input1Unit.value,
          this.input2Unit.value
        );
        console.log('convResult :>> ', convResult);
        break;
    }

    this.input2.setValue(convResult?.outputVal, {
      emitModelToViewChange: true,
    });
  }
  swapVals() {}
  addfavorite() {}
}
