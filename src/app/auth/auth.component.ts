import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  errorMessage = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  switchToggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    let payload = { ...f.value, returnSecureToken: true };
    this.isLoading = true;
    if (!this.isLogin) {
      this.authService.signup(f.value.email, f.value.password).subscribe(
        (res) => {
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err;
          this.isLoading = false;
        }
      );
    } else {
      this.http
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
          payload
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.errorMessage = err;
            this.isLoading = false;
          }
        );
    }
    f.reset();
  }
}
