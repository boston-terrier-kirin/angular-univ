import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup(this.controls);

  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.form.value);
  }

  createControls() {
    const email = new FormControl('', {
      validators: [Validators.required, Validators.email],
      // updatedOn: 'blur' を使うと、不正値 -> 有効値 に訂正した場合に、blurするまでエラーが消えないデメリットあり。
      // updateOn: 'blur',
    });

    const password = new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      // updatedOn: 'blur' を使うと、不正値 -> 有効値 に訂正した場合に、blurするまでエラーが消えないデメリットあり。
      // updateOn: 'blur',
    });

    return {
      email,
      password,
    };
  }

  hasErrors(name: string) {
    const { errors } = this.form.controls[name];
    return errors;
  }

  getErrors(name: string) {
    const { errors } = this.form.controls[name];
    if (errors) {
      console.log(name, errors['required']);
      if (errors['required']) {
        return 'Value is required.';
      }
      if (errors['email']) {
        return 'Invalid format.';
      }
      return null;
    }
    return null;
  }

  // angular material の mat-errorと組み合わせるのであれば、dirty, touched の判定は、mat-errorに任せた方が無難。
  // hasErrors(name: string) {
  //   const { dirty, touched, errors } = this.form.controls[name];
  //   return dirty && touched && errors;
  // }
  //
  // getErrors(name: string) {
  //   const { dirty, touched, errors } = this.form.controls[name];
  //   if (dirty && touched && errors) {
  //     if (errors['required']) {
  //       return 'Value is required.';
  //     }
  //     return null;
  //   }
  //   return null;
  // }
}
