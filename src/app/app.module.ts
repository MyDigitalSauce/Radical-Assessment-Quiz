import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StepperComponent } from './stepper/stepper.component';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatProgressBarModule, MatSliderModule, MatSnackBarModule,
  MatStepperModule,
} from "@angular/material";
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
=======
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
>>>>>>> d4e242c753e0ba995b565708eaf967ac20ce04dd

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    HeaderComponent,
    FooterComponent,
    ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatCardModule,
    MatSliderModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
