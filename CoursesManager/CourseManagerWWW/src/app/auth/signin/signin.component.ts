import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private router: Router,
    private authService: AuthService) { }

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
    this.isLoading = true;

    this.signinForm.controls.password.disable();
    this.signinForm.controls.email.disable();

    this.authService.signIn(this.signinForm.value).subscribe(res => {
      this.router.navigateByUrl('/');
      this.signinForm.controls.password.enable();
      this.signinForm.controls.email.enable();
      this.isLoading = false
    }, err => {
      this.signinForm.controls.password.enable();
      this.signinForm.controls.email.enable();
      this.isLoading = false;
      Swal.fire('Error', err.error.message, 'error');
    });
  }

}
