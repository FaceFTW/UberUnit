import { Component, OnInit } from '@angular/core';
import { ConvertFormComponent } from '../convert-form/convert-form.component';
import { SolveFormComponent } from '../solve-form/solve-form.component';

export type UIType = 'convert' | 'solve';
@Component({
  selector: 'app-convert-ui',
  templateUrl: './convert-ui.component.html',
  styleUrls: ['./convert-ui.component.css']
})
export class ConvertUIComponent implements OnInit {
  currentUI : UIType = 'convert';

  get showConvertUI(){
    return this.currentUI === 'convert';
  }

  get showSolveUI(){
    return this.currentUI === 'solve';
  }

  toggleUI(type:UIType){
    this.currentUI = type;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
