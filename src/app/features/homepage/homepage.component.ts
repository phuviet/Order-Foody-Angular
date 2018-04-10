import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  value: any

  constructor() {
    this.value = [
      {
        label: 'Viet',
        value: 'Nguyen'
      },
      {
        label: 'Nam',
        value: 'Nguyen'
      }
    ]
  }

  ngOnInit() {
  }

}
