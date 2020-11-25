import { AuthService, responseAuthData } from './auth.services';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {


  isLoginMode: boolean = true;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string;

  constructor(private AuthService: AuthService, private router: Router) { }

  // login & sign up Switcher
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(loginForm: NgForm) {
    let authObservable: Observable<responseAuthData>;
    this.isLoading = true;

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    if (this.isLoginMode) {
      authObservable = this.AuthService.logIn(email, password, true);
    } else {
      authObservable = this.AuthService.signUp(email, password, true);
      loginForm.reset();
    }

    authObservable.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isError = true;
        this.errorMessage = errorMessage;
        this.isLoading = false
      }
    )
  }


}
