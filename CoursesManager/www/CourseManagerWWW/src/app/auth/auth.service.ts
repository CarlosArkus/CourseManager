import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { SignInForm } from '../models/SignInForm.interface';
import { SignUpForm } from '../models/SignUpForm.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isloggedIn = new BehaviorSubject(this.loginStatus());

  get loggedIn() {
    return this.isloggedIn.asObservable();
  }

  signIn(formData: SignInForm) {
    return this.http.post(`${base_url}/auth/signin`, formData)
      .pipe(
        tap((res: any) => {
          this.setSession(res.token, res.userId);
        }),
      );
  }

  signUp(formData: SignUpForm) {
    return this.http.post(`${base_url}/auth/signup`, formData);
  }

  setSession(token: string, userId: string) {
    const expiresIn = moment().add(60 * 60 * 24, 'seconds');
    this.isloggedIn.next(true);
    localStorage.setItem('auth-token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresIn.valueOf()));
    localStorage.setItem('userId', userId);
  }

  loginStatus() {
    const expired = !localStorage.getItem('auth-token'); // token does not exist
    if (expired) return false;

    return moment().isBefore(this.getExpiration()); // time expires?
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at') || '{}';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  signOut() {
    this.isloggedIn.next(false);
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userId');
  }
}
