import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiService, AuthService, NotificationService } from '../../core/service/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html'
})
export class ConfirmRegisterComponent implements OnInit {

  confirmRegisterForm: FormGroup;
  confirm_token: any;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.confirm_token) {
        this.confirm_token = params.confirm_token;
      }
      this.initForm();
    })
  }

  initForm() {
    this.confirmRegisterForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  confirmRegister() {
    this.api.put(['users', 'confirm'], Object.assign(this.confirmRegisterForm.value, { confirm_token: this.confirm_token })).subscribe(
      (data: any) => {
        this.ns.message({
          type: 'success',
          msg: 'user.auth.confirm_register_success'
        });
        this.router.navigate(['/auth', 'login']);
      }, (error: any) => {
      }, () => {
      }
    )
  }
}
