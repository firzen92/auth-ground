import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLogin = true;

  constructor(private http: HttpClient) {}

  switchToggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    let payload = {...f.value, returnSecureToken: true};
    if(!this.isLogin) {
      this.http
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
          payload
        )
        .subscribe((res) => {
          console.log(res);
        }, err => {
          console.log(err);
        });
    } else {
      this.http
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLU9Z0QR9hwCW87aDW7aG_yHibhikKuaM",
          payload
        )
        .subscribe((res) => {
          console.log(res);
        }, err => {
          console.log(err);
        });
    }
    f.reset();
  }
}
