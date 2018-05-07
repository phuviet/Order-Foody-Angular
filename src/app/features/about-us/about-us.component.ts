import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, AuthService } from '../../core/service/index';
declare var google: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent implements OnInit {

  options: any;
  userInfo: any;
  shopDetail: any;
  overlays: any;

  constructor(
    private ns: NotificationService,
    private api: ApiService,
    private auth: AuthService
  ) {
    this.shopDetail = {};
    if (localStorage.getItem('shop_detail')) {
      JSON.parse(localStorage.getItem('shop_detail')).map((item: any) => {
        this.shopDetail[item.key] = item['value'];
      });
    }
    this.userInfo = this.auth.getUserInfo();
    this.options = {};
  }

  ngOnInit() {
    this.options = {
      center: {
        lat: +this.shopDetail.latitude,
        lng: +this.shopDetail.longitude
      },
      zoom: 17
    };
    this.overlays = [
      new google.maps.Marker({
        position: {
          lat: +this.shopDetail.latitude,
          lng: +this.shopDetail.longitude
        },
        title: this.shopDetail.shop_name
      })
    ];
  }

  handleMapClick(e: any) {
    // console.log(e);
    // console.log(e.latLng);
    // console.log(e.latLng.lat());
    // console.log(e.latLng.lng());
  }
}
