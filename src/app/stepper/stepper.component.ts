import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../Errors/ErrorStateMatcher";
import {LoginService} from "../login.service";
import {User} from "../models/user";
import {MatSnackBar} from "@angular/material";
import {Submission} from "../models/submission";



@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {



  // SKIN Color TYPES
  selectType(type: string)  {
    if(this.skinType === type)  {
      this.skinType = "";
    }  else {
      this.skinType = type;
    }
  }

  // SKIN TEXTURE TYPES
  selectTextureType(type: string)  {
    if(this.skinTextureType === type)  {
      this.skinTextureType = "";
    }  else {
      this.skinTextureType = type;
    }
  }

  // STATE VARIABLES
  Current_Question;

  // CREDENTIAL VARIABLES
  Details: FormGroup;
  matcher = new MyErrorStateMatcher();


  // QUESTION VARIABLES
  Q1_A: number;
  Q2_Country = "";
  Q2_City = "";
  Q2_State = "";
  skinTextureType = "";
  skinType = "";
  Cleanser = false;
  Toner = false;
  Moisturizer = false;
  Sunscreen = false;
  Hydroxy = false;
  Vitamin = false;
  Retinol = false;
  Other = false;
  description = "";

  constructor(private formBuilder: FormBuilder, private login: LoginService, private _snackBar: MatSnackBar) {}

  // GETTERS AND SETTERS
  get email() {
    return this.Details.get( 'email' );
  }
  get password() {
    return this.Details.get( 'password' );
  }
  get password_confirm() {
    return this.Details.get( 'password_confirm' );
  }
 checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirm.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {
    this.Current_Question = 6;
    this.Details = this.formBuilder.group ({
      email: new FormControl('', [
        //Validators.required,
        //Validators.email,
      ]),
      password: new FormControl('', [
        //Validators.required
      ]),
      password_confirm: new FormControl('', [
        //Validators.required
      ])
    }, {validator: this.checkPasswords });
  }

  Back()  {
    if(this.Current_Question > 1) {
      this.Current_Question--;
    }
  }
  Next()  {
    if (this.Current_Question === 1)  {
      //AGE
      if(this.Q1_A >= 18 && this.Q1_A < 100)  {
        this.Current_Question++;
      } else  {
        this.openSnackBar('Invalid Age', "close");
      }
    } else if( this.Current_Question === 2) { //Country
      if (this.Q2_Country.length >= 3 && this.Q2_State.length >= 3 && this.Q2_City.length >= 3 ) {
        this.Current_Question++;
      } else  {
        this.openSnackBar('Invalid Location', "close");
      }
    } else if( this.Current_Question === 3) { // skin type
      if (this.skinTextureType !== "")  {
        this.Current_Question++;
      } else  {
        this.openSnackBar('Please select an option', "close");
      }
    } else if (this.Current_Question === 4)  {
      this.Current_Question++;
    } else if( this.Current_Question === 5) { // skin type
      if (this.skinType !== "")  {
        this.Current_Question++;
      } else  {
        this.openSnackBar('Please select an option', "close");
      }
    }

  }

  Begin() {
    //send request to server
    let user = new User;
    user.email = this.Details.get( 'email' ).value;
    this.login.logIn(user).subscribe(
      (data: any) => {
            user.id = data.ID;
            user.username = data.user_login;
            user.password = this.Details.get('password').value;
            this.login.getToken(user).subscribe(
              (data1: any) => {
                user.token = data1.token;
                this.openSnackBar("Welcome, " + user.username + "!", "Close")

                this.Current_Question++;
              },
              error =>  {
                console.error(error);
                this.openSnackBar("Error Signing In", "Close")
              }
            );
          },
          error =>  {
            console.error(error);
            this.openSnackBar("Error Finding User", "Close")
          }
        );

  }

  Submit()  {

    let newSub = new Submission;


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
