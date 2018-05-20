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
  year: any;
  metadata: any;
  avatar: any;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private fb: FormBuilder
  ) {
    this.isProcessing = false;
    this.metadata = {
      genders: [
        { value: 'male', label: 'Male'},
        { value: 'female', label: 'Female'}
      ]
    }
    this.year = new Date().getFullYear() - 18;
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
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
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

  selectAvatar(e: any) {
    this.avatar = e.target.files[0];
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

  parseData() {
    let data = this.form.value;
    if (this.avatar) {
      data.avatar = this.avatar;
    }
    return data;
  }

  onSubmit() {
    this.isProcessing = this.ns.progress(true);
    this.api.put(['profile', this.userProfile.id], this.parseData()).subscribe(
      (data: any) => {
        this.userProfile = data.user;
        this.ns.message({
          type: 'success',
          msg: 'account.profile_update_success'
        });
      }, (error: any) => {
        this.isProcessing = this.ns.progress(false);
      }, () => {
        this.isProcessing = this.ns.progress(false);
      }
    )
  }
}
