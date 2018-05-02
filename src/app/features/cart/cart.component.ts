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
    private cart: CartService
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
  }

  removeItemCart(id: any) {
    this.cart.removeItemCart(id);
    this.cart.updateTotalPriceCart();
  }

  updateQuantityItemCart(id: any, quantity: any) {
    this.cart.updateQuantityItemCart(id, quantity);
    this.cart.updateTotalPriceCart();
  }
}
