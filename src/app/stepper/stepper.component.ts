import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  // STATE VARIABLES
  Current_Question;

  // CREDENTIAL VARIABLES
  Details: FormGroup;


  Email = "";
  Password = "";
  Password_Confirm = "";

  // QUESTION VARIABLES
  Q1_A = "";
  Q2_A = {
    Country: "",
    State: "",
    City: ""
  };
  Q3_A;
  Q4_A;

  constructor() {}

  // GETTERS AND SETTERS
  get email() { return this.Details.get( 'email' ); }
  get password() { return this.Details.get( 'password' ); }
  get password_confirm() { return this.Details.get( 'password_confirm' ); }

  ngOnInit() {
    this.Current_Question = 0;

    this.Details =  new FormGroup ({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      password_confirm: new FormControl('', [
        Validators.required
      ])
    });

  }

  Back()  {
    if(this.Current_Question > 1) {
      this.Current_Question--;
    }
  }
  Next()  {
    if(this.Current_Question < 6) {
      this.Current_Question++;
    }
  }
  Begin() {
    //send request to server
      //if approved proceed
        this.Current_Question++;
  }


  recheck()  {
    console.log(this.Details.valid);
  }
}
