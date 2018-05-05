import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, AuthService } from '../../core/service/index';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent implements OnInit {

  options: any;
  userInfo: any;
  shopDetail: any;

  constructor(
    private ns: NotificationService,
    private api: ApiService,
    private auth: AuthService
  ) {
    this.userInfo = this.auth.getUserInfo();
    this.shopDetail = {};
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['shop_detail']).subscribe(
      (data:any) => {
        data.map((item: any) => {
          this.shopDetail[item.key] = item['value'];
        });
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
