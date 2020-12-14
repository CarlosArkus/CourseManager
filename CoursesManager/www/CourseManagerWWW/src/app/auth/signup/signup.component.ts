import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isLoading: boolean = false;

  signinForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    'password': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
    'name': new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ])
  })

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

  getNameErrorMessage() {
    if (this.signinForm.controls.password.hasError('required')) {
      return 'Name is required';
    }

    if (this.signinForm.controls.password.hasError('maxlength')) {
      return 'Max name character 50';
    }

    return this.signinForm.controls.password.hasError('minlength') ? 'Enter at least 6 characters' : '';
  }

  onSubmit() {
    console.log('sign up');
    console.warn(this.signinForm.controls);

    this.signinForm.controls.name.disable();
    this.signinForm.controls.password.disable();
    this.signinForm.controls.email.disable();

    this.isLoading = true;
    // Simulate async call to api
    setTimeout(() => {
      //after login navigate to /pages
      this.router.navigateByUrl('signin');
      this.signinForm.controls.name.enable();
      this.signinForm.controls.password.enable();
      this.signinForm.controls.email.enable();
      this.isLoading = false
    }, 4000);
  }

}
