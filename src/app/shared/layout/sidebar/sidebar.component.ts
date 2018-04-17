import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  categories: any;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['categories']).subscribe(
      (data: any) => {
        this.categories = data;
      }, (err: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
