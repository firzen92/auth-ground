import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent{
  isLogin = true;
  isLoading = false;
  errorMessage = null;

  constructor(private authService: AuthService) {}

  switchToggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    let authObs:Observable<AuthResponse>;
    if (!this.isLogin) {
      authObs = this.authService.signup(f.value.email, f.value.password);
    } else {
      authObs = this.authService.login(f.value.email, f.value.password);
    }
    authObs.subscribe(
      (res) => {
        this.isLoading = false;
      },
      (err) => {
        this.errorMessage = err;
        this.isLoading = false;
      }
    );
    f.reset();
  }
}
