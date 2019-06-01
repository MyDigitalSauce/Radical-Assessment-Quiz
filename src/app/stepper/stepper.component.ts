import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../Errors/ErrorStateMatcher";
import {LoginService} from "../login.service";
import {User} from "../models/user";
import {MatSnackBar} from "@angular/material";
import {Submission} from "../models/submission";
import {Question} from "../models/question";
import {SubmissionService} from "../submission.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  //Current User
  User: any;

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

  // Question times
  Time1;
  Time2;
  Time3;
  Time4;
  Time5;
  Time6;


  // QUESTION VARIABLES
  Q1_A = 18;
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

  constructor(private formBuilder: FormBuilder, private login: LoginService, private _snackBar: MatSnackBar, private subservice: SubmissionService) {}

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
    this.Current_Question = 0;
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
        this.Time1 = new Date();
      } else  {
        this.openSnackBar('Invalid Age', "close");
      }
    } else if( this.Current_Question === 2) { //Country
      if (this.Q2_Country.length >= 3 && this.Q2_State.length >= 3 && this.Q2_City.length >= 3 ) {
        this.Current_Question++;
        this.Time2 = new Date();

      } else  {
        this.openSnackBar('Invalid Location', "close");
      }
    } else if( this.Current_Question === 3) { // skin type
      if (this.skinTextureType !== "")  {
        this.Current_Question++;
        this.Time3 = new Date();

      } else  {
        this.openSnackBar('Please select an option', "close");
      }
    } else if (this.Current_Question === 4)  {
      this.Current_Question++;
      this.Time4 = new Date();

    } else if( this.Current_Question === 5) { // skin type
      if (this.skinType !== "")  {
        this.Current_Question++;
        this.Time5 = new Date();

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
    this.User = user;
  }

  Submit()  {

    let Q1 = new Question;
    Q1.Answer = this.Q1_A;
    Q1.ID = '1';
    Q1.Time = this.Time1;
    Q1.TitleText = "Age";

    let Q2 = new Question;
    Q2.Answer = {
      Country: this.Q2_Country,
      State: this.Q2_State,
      City: this.Q2_City
    };
    Q2.ID = 2;
    Q2.Time = this.Time2;
    Q2.TitleText = "Location";

    let Q3 = new Question;
    Q3.Answer = this.skinTextureType;
    Q3.ID = 3;
    Q3.Time = this.Time3;
    Q3.TitleText = "Skin Type";

    let Q4 = new Question;
    Q4.Answer = {
      Cleanser: this.Cleanser,
      Toner:  this.Toner,
      Moisturizer: this.Moisturizer,
      Sunscreen: this.Sunscreen,
      Hydroxy: this.Hydroxy,
      Vitamin: this.Vitamin,
      Retinol: this.Retinol,
      Other: this.Other
    };
    Q4.ID = 4;
    Q4.Time = this.Time4;
    Q4.TitleText = "Skin Routine";

    let Q5 = new Question;
    Q5.Answer = this.skinType;
    Q5.ID = '5';
    Q5.Time = this.Time5;
    Q5.TitleText = "Skin Color";

    let Q6 = new Question;
    Q6.Answer = this.description;
    Q6.ID = '6';
    Q6.Time = new Date();
    Q6.TitleText = "Current products";

    let newSubmission = new Submission;
    newSubmission.SubmitTime = new Date();
    newSubmission.Questions = [Q1,Q2,Q3,Q4,Q5,Q6];
    newSubmission.Username = this.User.username;

    this.subservice.saveSubmission(newSubmission).subscribe(
      (data: any) => {
        console.log(data);
      }, error =>  {
        console.error(error);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
