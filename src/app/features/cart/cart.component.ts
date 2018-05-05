import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, CartService, AuthService } from '../../core/service/index';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  currentCart: any;
  totalPriceCart: number;

  constructor(
    private cart: CartService,
    private ns: NotificationService
  ) {
  }

  ngOnInit() {
    this.cart.price$.subscribe((totalPrice: any) => {
      this.totalPriceCart = totalPrice;
    });
    this.cart.cart$.subscribe((currentCart: any) => {
      this.currentCart = currentCart;
    });
    this.currentCart = [];
    if (localStorage.getItem('cart')) {
      this.currentCart = JSON.parse(localStorage.getItem('cart'));
    }
    this.cart.updateTotalPriceCart();
    this.cart.updateTotalItem();
  }

  removeItemCart(orderItem: any) {
    this.ns.progress(true);
    setTimeout(() => {
      this.ns.message({
        type: 'success',
        msg: 'order.remove_from_cart_success',
        msgObj: {
          product: orderItem.name
        }
      });
      this.cart.removeItemCart(orderItem.id);
      this.cart.updateTotalPriceCart();
      this.cart.updateTotalItem();
      this.ns.progress(false);
    }, 500)
  }

  updateQuantityItemCart(id: any, quantity: any, key: string) {
    if (key === 'diff') {
      if (+quantity > 1) {
        quantity = +quantity - 1;
      }
    } else {
      quantity = +quantity + 1;
    }
    this.cart.updateQuantityItemCart(id, quantity);
    this.cart.updateTotalPriceCart();
    this.cart.updateTotalItem();
  }
}
