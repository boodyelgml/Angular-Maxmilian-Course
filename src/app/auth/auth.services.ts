import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';



export interface responseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  // sign up
  signUp(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentivcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }


  // sign in
  signIn(email: string, password: string, token: boolean) {
    return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentivcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }


  // handle Authentivcation
  private handleAuthentivcation(email: string, id: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, idToken, expirationDate);
    this.user.next(user);
  }

  // handle errors
  private handleError(errorCatched: HttpErrorResponse) {

    let errorMessage = 'unknown error';
    if (!errorCatched.error || !errorCatched.error.error) {
      return throwError(errorMessage);
    }
    switch (errorCatched.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email dosn\'t exist';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
