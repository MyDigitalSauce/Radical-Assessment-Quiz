import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  Current_Question;

  Q1_A = "";
  Q2_A = {
    Country: "",
    State: "",
    City: ""
  };
  Q3_A;
  Q4_A;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.Current_Question = 1;
  }

  Back()  {
    if(this.Current_Question > 0) {
      this.Current_Question--;
    }
  }
  Next()  {
    if(this.Current_Question < 6) {
      this.Current_Question++;
    }
  }
}
