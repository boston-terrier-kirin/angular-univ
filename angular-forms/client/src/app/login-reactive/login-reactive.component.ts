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
      // updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    }),
  });

  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.form.value);
  }
}
