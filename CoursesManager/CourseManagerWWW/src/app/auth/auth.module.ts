import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
