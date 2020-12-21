import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$ : Observable<boolean>;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.isLoggedIn$ = authService.loggedIn;
  }

  ngOnInit(): void {
  }

  toSignIn() {
    this.router.navigateByUrl('signin');
  }

  toSignOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }

}
