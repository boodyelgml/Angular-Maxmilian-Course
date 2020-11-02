import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


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
    constructor(private http: HttpClient) {

    }
    signUp(email: string, password: string, token: boolean) {
        return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    signIn(email: string, password: string, token: boolean) {
        return this.http.post<responseAuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEkELjj9Vf3yF46q36fWZXpZC_IvUrCCE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }


    
    private  handleError(errorCatched: HttpErrorResponse) {

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