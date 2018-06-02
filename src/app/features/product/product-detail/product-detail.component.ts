import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, NotificationService, AuthService } from '../../../core/service/index';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DataGridModule } from 'primeng/primeng';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  isProcessing: boolean;
  isCanReview: boolean;
  formReview: FormGroup;
  formComment: FormGroup;
  productId: number;
  product: any;
  quantity: number;
  bestSellersProduct: any;
  pointerProduct: any;
  userInfo: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ns: NotificationService,
    private auth: AuthService
  ) {
    this.isCanReview = true;
    this.quantity = 1;
    this.isProcessing = false;
    this.bestSellersProduct = [];
    this.product = {};
    this.userInfo = this.auth.getUserInfo();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.id) {
        this.productId = + params['id'];
        this.initFormReview();
        this.initFormComment();
        this.fetchData();
        if (this.userInfo.id) {
          this.fetchProductPointer();
        }
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
    }, 500)
  }

  submitReview() {
    this.isProcessing = this.ns.progress(true);
    this.api.post(['votes'], this.formReview.value).subscribe(
      (data: any) => {
        this.product.votes = data;
        let reviewUser = this.product.votes.find((item: any) => item.user.id === this.userInfo.id);
        if (reviewUser) {
          this.isCanReview = false;
        }
        this.parseDateReview(this.product.votes);
        this.formReview.reset();
        this.ns.message({
          type: 'success',
          msg: 'product.review_success'
        })
      }, (error: any) => {
        this.isProcessing = this.ns.progress(false);
      }, () => {
        this.isProcessing = this.ns.progress(false);
      }
    )
  }

  commentChild(e: any, parentId: number) {
    if (e.keyCode === 13 && e.target.value) {
      let dataRequest = {
        context: e.target.value,
        product_id: this.productId,
        parent_id: parentId
      }
      this.api.post(['comments'], dataRequest).subscribe(
        (data: any) => {
          e.target.value = '';
          this.product.parent_comments = data;
          this.parseDateComment(this.product.parent_comments);
        }, (error: any) => {
          //
        }, () => {
          //
        }
      )
    }
  }

  submitComment() {
    this.formComment.controls['product_id'].setValue(this.productId);
    this.isProcessing = this.ns.progress(true);
    this.api.post(['comments'], this.formComment.value).subscribe(
      (data: any) => {
        this.product.parent_comments = data;
        this.parseDateComment(this.product.parent_comments);
        this.formComment.reset();
      }, (error: any) => {
        this.isProcessing = this.ns.progress(false);
      }, () => {
        this.isProcessing = this.ns.progress(false);
      }
    )
  }

  fetchProductPointer() {
    this.api.get(['products', 'pointer']).subscribe(
      (data: any) => {
        this.pointerProduct = [
          ...(data.products_new.map((item: any) => { item.title = 'new'; return item })),
          ...(data.products_seller.map((item: any) => { item.title = 'seller'; return item }))
        ];
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }

  fetchData() {
    this.api.multiple(
      { uri: ['products', this.productId], method: 'GET' },
      { uri: ['products', 'sellers'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.product = data[0];
          let reviewUser = this.product.votes.find((item: any) => item.user.id === this.userInfo.id);
          if (reviewUser) {
            this.isCanReview = false;
          }
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
