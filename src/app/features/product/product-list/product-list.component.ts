import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/index';
import { Router, ActivatedRoute } from '@angular/router';
import { datatableConfigs, DataTableConfigs } from '../../../shared/model/datatable.config';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  sortOptionList: any;
  productList: any;
  categoryId: number;
  datatableConfigs: DataTableConfigs;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productList = [];
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

  fetchData() {
    this.api.get(['categories', this.categoryId, 'products']).subscribe(
      (data: any) => {
        this.datatableConfigs.value = data.products;
        this.datatableConfigs.totalRecords = data.meta.total_entries;
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
