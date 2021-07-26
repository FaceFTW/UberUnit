import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConvertFormComponent } from '../convert-form/convert-form.component';
import { SolveFormComponent } from '../solve-form/solve-form.component';

export type UIType = 'Convert' | 'Solve';
@Component({
  selector: 'app-convert-ui',
  templateUrl: './convert-ui.component.html',
  styleUrls: ['./convert-ui.component.scss']
})
export class ConvertUIComponent implements OnInit {
  currentUI = new FormControl('Convert');

  get showConvertUI(){
    return this.currentUI.value =='Convert';
  }

  get showSolveUI(){
    return this.currentUI.value ==='Solve';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
