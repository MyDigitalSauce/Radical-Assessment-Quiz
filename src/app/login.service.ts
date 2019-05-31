import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {User} from "./models/user";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Http} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
// apiRoot = 'http://192.168.64.2/radicalskincare/wp-json'; // local
   apiRoot = 'https://radicalskincare.com/wp-json'; // prod
  url1=  this.apiRoot + '/userservices/v1/get_username_by_email';
  url2 = this.apiRoot + '/jwt-auth/v1/token';

  constructor(private http: HttpClient) { }

  logIn(user: User) {
    return this.http.post(this.url1, user);
  }

  getToken(user: User) {
    return this.http.post(this.url2, user);
  }


}
