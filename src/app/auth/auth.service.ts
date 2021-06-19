import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { createViewChild } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresId: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email, password) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
        payload
      )
      .pipe(
        catchError((errorRes) => {
          this.handleError(errorRes);
        })
      );
  }

  login(email, password) {
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
        payload
      )
      .pipe(
        catchError((errorRes) => {
          this.handleError(errorRes);
        })
      );
  }

  handleError(err: HttpErrorResponse) {
    if (err.error.error.message) {
      return throwError(err.error.error.message);
    }
  }

}
