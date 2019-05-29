import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);
    return (invalidCtrl );
  }
}
