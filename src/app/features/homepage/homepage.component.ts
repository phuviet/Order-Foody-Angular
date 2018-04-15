import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit() {
  }

}
