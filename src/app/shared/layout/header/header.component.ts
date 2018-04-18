import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  categories: any;
  topNewestProduct: any;

  constructor(
    private api: ApiService
  ) {
    this.topNewestProduct = [];
  }

  ngOnInit() {
    this.fetchData();
  }
   
  fetchData() {
    this.api.multiple(
      { uri: ['categories'], method: 'GET' },
      { uri: ['products', 'newest'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.categories = data[0];
        }
        if (data[1]) {
          this.topNewestProduct = data[1];
        }
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
