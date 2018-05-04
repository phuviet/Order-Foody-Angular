import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, NotificationService } from '../../../core/service/index';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  isProcessing: boolean;
  formReview: FormGroup;
  formComment: FormGroup;
  productId: number;
  product: any;
  quantity: number;
  bestSellersProduct: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ns: NotificationService
  ) {
    this.quantity = 1;
    this.isProcessing = false;
    this.bestSellersProduct = [];
    this.product = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.id) {
        this.productId = + params['id'];
        this.initFormReview();
        this.initFormComment();
        this.fetchData();
      }
    });
  }

  initFormComment() {
    this.formComment = this.fb.group({
      context: ['', Validators.required],
      product_id: this.productId
    });
  }

  initFormReview() {
    this.formReview = this.fb.group({
      description: ['', Validators.required],
      star: ['', Validators.required],
      product_id: this.productId
    });
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

  submitReview() {
    this.api.post(['votes'], this.formReview.value).subscribe(
      (data: any) => {
        this.product.votes = data;
        this.parseDateReview(this.product.votes);
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }

  submitComment(id: number) {

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
          this.parseDateComment(this.product.parent_comments);
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
        item.isShowChildComment = false;
        if (item.child_comments) {
          this.parseDateComment(item.child_comments);
        }
        return item;
      });
    }
  }

  toggleShowComment(parentComment: any) {
    parentComment.isShowChildComment = !parentComment.isShowChildComment;
  }
}
