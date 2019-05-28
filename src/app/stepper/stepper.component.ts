import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../Errors/ErrorStateMatcher";



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
  matcher = new MyErrorStateMatcher();


  // QUESTION VARIABLES
  Q1_A = "";
  Q2_A = {
    Country: "",
    State: "",
    City: ""
  };
  Q3_A;
  Q4_A;

  constructor(private formBuilder: FormBuilder) {}

  // GETTERS AND SETTERS
  get email() { return this.Details.get( 'email' ); }
  get password() { return this.Details.get( 'password' ); }
  get password_confirm() { return this.Details.get( 'password_confirm' ); }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirm.value;
    return pass === confirmPass ? null : { notSame: true }
  }
  ngOnInit() {
    this.Current_Question = 1;

    this.Details = this.formBuilder.group ({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      password_confirm: new FormControl('', [
        Validators.required])
    }, {validator: this.checkPasswords });

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

}
