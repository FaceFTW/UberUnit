import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Unit, unitSetList } from '../convert-ui/convert-ui.component';
import { ConverterService } from '../converter.service';
import { FavoritesService } from '../favorites.service';
import { HistoryService } from '../history.service';
import { ConvertUIComponent } from '../convert-ui/convert-ui.component';
@Component({
  selector: 'app-convert-form',
  templateUrl: './convert-form.component.html',
  styleUrls: ['./convert-form.component.scss'],
})
export class ConvertFormComponent implements OnInit {
  //This list is hardcoded for now, may move to a separate local JSON
  @Input() currentUnitSet = 0;
  @Input() currentUnitList: Unit[] = unitSetList[this.currentUnitSet].list;
  input1 = new FormControl('');
  input1Unit = new FormControl(unitSetList[this.currentUnitSet].list[0]);
  input2 = new FormControl('');
  input2Unit = new FormControl(unitSetList[this.currentUnitSet].list[1]);

  constructor(
    private convServ: ConverterService,
    private favServ: FavoritesService,
  ) {}

  ngOnInit(): void {}

  doConvert() {
    //pass inputs to the converter service, get the desired results back
    let convResult;
    switch (this.currentUnitSet) {
      case 0:
        convResult = this.convServ.doLengthConversion(
          this.input1.value,
          this.input1Unit.value,
          this.input2Unit.value
        );
        break;
    }

    this.input2.setValue(convResult?.outputVal);
  }
  swapVals() {

  }
  addfavorite() {}
}
