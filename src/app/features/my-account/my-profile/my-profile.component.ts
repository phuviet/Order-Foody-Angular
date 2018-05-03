import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService, NotificationService } from '../../../core/service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent implements OnInit {

  isProcessing: any;
  form: FormGroup
  userProfile: any;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private fb: FormBuilder
  ) {
    this.isProcessing = false;
  }

  ngOnInit() {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  setDataForForm() {
    for (let field in this.form.controls) {
      if (this.userProfile[field]) {
        if (field === 'birthday') {
          this.form.controls[field].setValue(new Date(this.userProfile[field]));
        } else {
          this.form.controls[field].setValue(this.userProfile[field]);
        }
      }
    }
  }

  fetchData() {
    this.api.get(['profile']).subscribe(
      (data: any) => {
        this.userProfile = data.user;
      }, (error: any) => {
        //
      }, () => {
        this.setDataForForm();
      }
    )
  }

  onSubmit() {
    this.isProcessing = this.ns.progress(true);
    this.api.put(['profile', this.userProfile.id], this.form.value).subscribe(
      (data: any) => {
        this.userProfile = data.user;
        this.ns.message({
          type: 'success',
          msg: 'Your profile has been updated.'
        });
      }, (error: any) => {
        this.isProcessing = this.ns.progress(false);
      }, () => {
        this.isProcessing = this.ns.progress(false);
      }
    )
  }
}
