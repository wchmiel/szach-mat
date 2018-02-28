import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // declaration of signup Form
    this.signupForm = new FormGroup({
      'nick': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passFields': new FormGroup({
        'password': new FormControl(null, [
          Validators.required,
          this.passwordLengthValidator,
          // this.firstPasswordEquality.bind(this)
        ]),
        'conf_password': new FormControl(null, [
          Validators.required,
          this.passwordLengthValidator,
          // this.secondPasswordEquality.bind(this)
        ])
      }, this.passwordMatchValidator)
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  passwordLengthValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 6)) {
      return {'passwordLength': true};
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup): {[s: string]: boolean} {
    if (group.get('password').value !== group.get('conf_password').value) {
      return {'passwordMismatch': true};
    }
    return null;
  }

  // firstPasswordEquality(control: FormControl): {[s: string]: boolean} {
  //   console.log('first-check');
  //   if (control.value && control.value !== this.signupForm.get('conf_password').value) {
  //     return {'passwordsEquality': true};
  //   }
  //   return null;
  // }
  //
  // secondPasswordEquality(control: FormControl): {[s: string]: boolean} {
  //   console.log('second-check');
  //   if (control.value && control.value !== this.signupForm.get('password').value) {
  //     return {'passwordsEquality': true};
  //   }
  //   return null;
  // }

}
