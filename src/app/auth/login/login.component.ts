import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiService, AuthService, NotificationService } from '../../core/service/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private ns: NotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['vietdn1991@gmail.com', Validators.compose([Validators.required, CustomValidators.email])],
      password: ['123456', Validators.compose([Validators.required])],
    });
  }

  login() {
    this.api.post(['auths'], this.loginForm.value).subscribe(
      (data: any) => {
        this.auth.login(data);
      }, (err: any) => {
        this.ns.message({
          type: 'danger',
          msg: 'auth.login_failure'
        })
      }, () => {
        //
      }
    );
  }
}
