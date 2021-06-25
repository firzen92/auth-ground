import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserDetails } from "./user.model";

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user$ = new BehaviorSubject<UserDetails>(null);

  constructor(private http: HttpClient, private router: Router) {}

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
        catchError(errorRes => this.handleError(errorRes)),
        tap((response) => {
          this.handleAuthentication(
            response.localId,
            response.email,
            response.idToken,
            response.expiresIn
          );
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
        catchError(errorRes => this.handleError(errorRes)),
        tap((response) => {
          this.handleAuthentication(
            response.localId,
            response.email,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }

  handleAuthentication(id, email, idToken, expiration) {
    let expires = new Date(new Date().getTime() + +expiration * 1000);
    let user = new UserDetails(id, email, idToken, expires);
    this.user$.next(user);
    this.router.navigate(["/recipes"]);
  }

  handleError(err: HttpErrorResponse) {
    if (err.error.error.message) {
      return throwError(err.error.error.message);
    }
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['/auth']);
  }

}
