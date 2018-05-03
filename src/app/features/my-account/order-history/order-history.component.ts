import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from '../../../core/service/index';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {

  userInfo: any;
  orderHistory: any;

  constructor(
    private api: ApiService,
    private ns: NotificationService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['profile']).subscribe(
      (data: any) => {
        this.userInfo = data.user;
        this.orderHistory = data.orders;
        this.parseTotalPriceOrder();
      }, (error: any) => {
        //
      }, () => {
      }
    )
  }

  parseTotalPriceOrder() {
    this.orderHistory.map((order: any) => {
      let totalOrder = 0;
      order.order_items.map((itemOrder: any) => {
        totalOrder += itemOrder.total_price;
      });
      order.totalPrice = totalOrder;
    });
  }
}
