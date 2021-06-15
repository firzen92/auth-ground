import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLogin = true;

  constructor() {}

  switchToggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }
}
