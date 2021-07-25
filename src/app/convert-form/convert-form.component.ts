import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-convert-form',
  templateUrl: './convert-form.component.html',
  styleUrls: ['./convert-form.component.css']
})
export class ConvertFormComponent implements OnInit {
  input1 = new FormControl('');
  input2 = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  doConvert(){};
  swapVals(){};
}
