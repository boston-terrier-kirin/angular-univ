import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      // updatedOn: 'blur' を使うと、不正値 -> 有効値 に訂正した場合に、blurするまでエラーが消えないデメリットあり。
      // updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      // updatedOn: 'blur' を使うと、不正値 -> 有効値 に訂正した場合に、blurするまでエラーが消えないデメリットあり。
      // updateOn: 'blur',
    }),
  });

  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.form.value);
  }
}
