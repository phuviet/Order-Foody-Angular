import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html'
})
export class FeaturesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    jQuery('body.ecommerce').css('background-color', '#f9f9f9');
  }
}
