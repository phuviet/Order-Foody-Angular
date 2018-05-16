import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  categories: any;
  shopDetail: any;

  constructor(
    private api: ApiService
  ) {
    this.shopDetail = {};
    if (localStorage.getItem('shop_detail')) {
      JSON.parse(localStorage.getItem('shop_detail')).map((item: any) => {
        this.shopDetail[item.key] = item['value'];
      });
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.multiple(
      { uri: ['categories'], method: 'GET' },
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.categories = data[0];
        }
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
