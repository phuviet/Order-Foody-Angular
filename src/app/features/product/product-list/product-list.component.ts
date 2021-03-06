import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, NotificationService } from '../../../core/service/index';
import { Router, ActivatedRoute } from '@angular/router';
import { datatableConfigs, DataTableConfigs } from '../../../shared/model/datatable.config';
import { parseQuery, updateQuery } from '../../../shared/function/url';
import { compare } from '../../../shared/function/data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  @ViewChild('paginator') paginator: any;

  sortOptionList: any;
  productList: any;
  categoryId: number;
  datatableConfigs: DataTableConfigs;
  bestSellersProduct: any;
  params: any;
  optionsSort: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService
  ) {
    this.productList = [];
    this.params = {};
    this.optionsSort = ['id', 'ASC'];
    this.datatableConfigs = datatableConfigs();
    this.sortOptionList = [
      {
        label: 'Default',
        value: ''
      },
      {
        label: 'Name (A - Z)',
        value: ''
      },
      {
        label: 'Name (Z - A)',
        value: ''
      },
      {
        label: 'Price (Low > High)',
        value: ''
      },
      {
        label: 'Price (High > Low)',
        value: ''
      },
      {
        label: 'Rating (Highest)',
        value: ''
      },
      {
        label: 'Rating (Lowest)',
        value: ''
      }
    ]
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params && params.id) {
        this.params.page = 1;
        this.paginator.first = 0;
        this.categoryId = +params['id'];
      }
      this.fetchData();
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

  fetchData() {
    let _params: any = parseQuery(this.params);
    this.api.multiple(
      { uri: ['categories', this.categoryId, `products${_params}`], method: 'GET' },
      { uri: ['products', 'sellers'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.datatableConfigs.value = data[0].products;
          this.datatableConfigs.totalRecords = data[0].meta.total_entries;
        }
        if (data[1]) {
          this.bestSellersProduct = data[1];
        }
      }, (error: any) => {
        //
      }, () => {
        this.sortChange();
      }
    )
  }

  sortChange(e?: any) {
    this.optionsSort = e ? e.target.value.split('&') : this.optionsSort;
    if (e) {
      this.ns.progress(true);
      setTimeout(() => {
        this.datatableConfigs.value.sort((item1: any, item2: any) => {
          return compare(item1, item2, this.optionsSort[0], this.optionsSort[1]);
        });
        this.ns.progress(false);
      }, 500);
    } else {
      this.datatableConfigs.value.sort((item1: any, item2: any) => {
        return compare(item1, item2, this.optionsSort[0], this.optionsSort[1]);
      });
    }
  }

  loadData(e: any) {
    this.params.page = e.page + 1;
    this.fetchData();
    // this.router.navigate(updateQuery(this.route.snapshot, this.params));
  }
}
