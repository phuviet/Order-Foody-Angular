import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from '../../../core/service/index';
import { Router, ActivatedRoute } from '@angular/router';
import { datatableConfigs, DataTableConfigs } from '../../../shared/model/datatable.config';
import { parseQuery, updateQuery } from '../../../shared/function/url';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  sortOptionList: any;
  productList: any;
  categoryId: number;
  datatableConfigs: DataTableConfigs;
  bestSellersProduct: any;
  params: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService
  ) {
    this.productList = [];
    this.params = {};
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
        this.categoryId = +params['id'];
      }
      this.fetchData();
    });
  }

  addToCart(product: any, quantity: number = 1) {
    this.ns.cart(product, quantity);
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
        //
      }
    )
  }

  loadData(e: any) {
    this.params.page = e.page + 1;
    this.router.navigate(updateQuery(this.route.snapshot, this.params));
  }
}
