import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from '../../core/service/index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  bestSellersProduct: any;
  topNewstProduct: any;

  constructor(
    private api: ApiService,
    private ns: NotificationService
  ) {
    this.bestSellersProduct = [];
    this.topNewstProduct = [];
  }

  ngOnInit() {
    this.fetchData();
  }

  addToCart(product: any, quantity: number = 1) {
    this.ns.progress(true);
    setTimeout(() => {
      this.ns.message({
        type: 'success',
        msg: 'order.add_to_cart_success',
        msgObj: {
          product: product.name,
          quantity: quantity
        }
      });
      this.ns.cart(product, quantity);
      this.ns.progress(false);
    }, 700)
  }

  fetchData() {
    this.api.multiple(
      { uri: ['products', 'sellers'], method: 'GET' },
      { uri: ['products', 'newest'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.bestSellersProduct = data[0];
        }
        if (data[1]) {
          this.topNewstProduct = data[1];
        }
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
