import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  bestSellersProduct: any;

  constructor(
    private api: ApiService
  ) {
    this.bestSellersProduct = [];
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['products', 'sellers']).subscribe(
      (data: any) => {
        this.bestSellersProduct = data;
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
