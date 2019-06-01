import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Submission} from "./models/submission";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  url1 = 'http://localhost:3000/createSubmission';

  constructor(private http: HttpClient) {}

  saveSubmission(sub: Submission) {
    return this.http.post(this.url1, sub);
  }
}
