import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  sortOptionList: any;

  constructor() {
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
  }

}
