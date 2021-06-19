import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  errorMessage = null;
  authObs: Observable<AuthResponse>;

  constructor(private http: HttpClient, private authService: AuthService) {}

  switchToggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    if (!this.isLogin) {
      this.authObs = this.authService.signup(f.value.email, f.value.password);
    } else {
      this.authObs = this.authService.login(f.value.email, f.value.password);
    }
    this.authObs.subscribe(
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
