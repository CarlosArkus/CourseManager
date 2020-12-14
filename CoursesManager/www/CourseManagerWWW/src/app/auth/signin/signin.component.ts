import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  isLoading: boolean = false;

  signinForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required,
      Validators.email
    ]
    ),
    'password': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ],
    )
  });

  constructor(private router: Router) { }

  getEmailErrorMessage() {
    if (this.signinForm.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.signinForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.signinForm.controls.password.hasError('required')) {
      return 'Password is required';
    }

    return this.signinForm.controls.password.hasError('minlength') ? 'Enter at least 6 characters' : '';
  }

  onSubmit() {
    console.log('sign in');
    console.warn(this.signinForm.controls);

    this.signinForm.controls.password.disable();
    this.signinForm.controls.email.disable();
    
    this.isLoading = true;
    // Simulate async call to api
    setTimeout(() => {
      //after login navigate to /pages
      this.router.navigateByUrl('pages');
      this.signinForm.controls.password.enable();
      this.signinForm.controls.email.enable();
      this.isLoading = false
    }, 4000);
  }

}
