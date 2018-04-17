import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/service/index';
import * as moment from 'moment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: any;
  bestSellersProduct: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bestSellersProduct = [];
    this.product = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.id) {
        this.productId = + params['id'];
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.api.multiple(
      { uri: ['products', this.productId], method: 'GET' },
      { uri: ['products', 'sellers'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.product = data[0];
          this.parseDateReview(this.product.votes);
          console.log(this.product.parent_comments);
          // this.parseDateComment(this.product.parent_comments);
        }
        if (data[1]) {
          this.bestSellersProduct = data[1];
        }
      }, (error: any) => {
        //
      }, () => {
        //
      }
    );
  }

  parseDateReview(data: any) {
    if (data && data.length) {
      data.map((item: any) => {
        item.created_at = moment(item.created_at).format('DD/MM/YYYY - HH:mm:ss');
        return item;
      });
    }
  }

  parseDateComment(data) {
    if (data && data.length) {
      data.map((item: any) => {
        let local = moment.utc(item.created_at).toDate();
        item.created_at = moment(local).local().format('YYYY/MM/DD HH:mm:ss');
        item.from_now = moment(item.created_at, 'YYYY/MM/DD HH:mm:ss').fromNow();
        return item;
      });
    }
  }
}
