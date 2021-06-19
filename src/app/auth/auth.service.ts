import { HttpClient } from "@angular/common/http";
import { createViewChild } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email, password) {
    let payload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
        payload
      )
      .pipe(
        catchError((errorRes) => {
          if (errorRes.error.error.message) {
            return throwError(errorRes.error.error.message);
          }
        })
      );
  }

  login(email, password) {}
}
