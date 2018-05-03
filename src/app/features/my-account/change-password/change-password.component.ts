import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, AuthService } from '../../../core/service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  isProcessing: boolean;
  userInfo: any;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.isProcessing = false;
    this.userInfo = this.auth.getUserInfo();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isProcessing = this.ns.progress(true);
    this.api.put(['profile', this.userInfo.id, 'password'], this.form.value).subscribe(
      (data: any) => {
        this.ns.message({
          type: 'success',
          msg: 'user.msg.password_updated'
        });
        this.form.reset();
      }, (error: any) => {
        this.isProcessing = this.ns.progress(false);
      }, () => {
        this.isProcessing = this.ns.progress(false);
      }
    )
  }

  isPasswordMatch() {
    return this.form.value.password === this.form.value.password_confirmation;
  }
}
