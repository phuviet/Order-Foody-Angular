import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  currentCart: any;
  totalPriceCart: number;

  constructor() {
    this.currentCart = [];
    this.totalPriceCart = 0;
  }

  updateTotalPriceCart() {
    if (localStorage.getItem('cart')) {
      this.currentCart = JSON.parse(localStorage.getItem('cart'));
    }
    this.totalPriceCart = 0;
    this.currentCart.map((item: any) => {
      this.totalPriceCart += item.total;
    });
    return this.totalPriceCart;
  }

  removeItemCart(id: any) {
    let indexItemRemove = this.currentCart.findIndex((item: any) => item.id === id);
    this.currentCart.splice(indexItemRemove, 1);
    localStorage.setItem('cart', JSON.stringify(this.currentCart));
    return this.currentCart;
  }
}

export const CART_PROVIDERS: any[] = [
  CartService
];
