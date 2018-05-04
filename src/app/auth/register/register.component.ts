import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiService, AuthService, NotificationService } from '../../core/service/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  isProcessing: boolean;
  registerForm: FormGroup;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isProcessing = false;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])],
      password: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.required]
    });
  }

  register() {
    this.api.post(['users', 'register'], this.registerForm.value).subscribe(
      (date: any) => {
        this.ns.message({
          type: 'success',
          msg: 'user.auth.register_success'
        });
        this.router.navigate(['/auth', 'login']);
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }

  isPasswordMatch() {
    return this.registerForm.value.password === this.registerForm.value.password_confirmation;
  }
}
