import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isLoading: boolean = false;

  signupForm: FormGroup = new FormGroup({
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

  constructor(private router: Router,
    private authService: AuthService) { }

  getEmailErrorMessage() {
    if (this.signupForm.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.signupForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.signupForm.controls.password.hasError('required')) {
      return 'Password is required';
    }

    return this.signupForm.controls.password.hasError('minlength') ? 'Enter at least 6 characters' : '';
  }

  getNameErrorMessage() {
    if (this.signupForm.controls.password.hasError('required')) {
      return 'Name is required';
    }

    if (this.signupForm.controls.password.hasError('maxlength')) {
      return 'Max name character 50';
    }

    return this.signupForm.controls.password.hasError('minlength') ? 'Enter at least 6 characters' : '';
  }

  onSubmit() {
    this.signupForm.controls.name.disable();
    this.signupForm.controls.password.disable();
    this.signupForm.controls.email.disable();

    this.isLoading = true;

    this.authService.signUp(this.signupForm.value)
      .subscribe((res: any) => {
        Swal.fire('Success', 'User created', 'success');
        this.router.navigateByUrl('signin');
        this.signupForm.controls.name.enable();
        this.signupForm.controls.password.enable();
        this.signupForm.controls.email.enable();
        this.isLoading = false
      }, err => {
        this.isLoading = false;
        this.signupForm.controls.name.enable();
        this.signupForm.controls.password.enable();
        this.signupForm.controls.email.enable();
        Swal.fire('Error', err.error.message, 'error');
      });
  }

}
