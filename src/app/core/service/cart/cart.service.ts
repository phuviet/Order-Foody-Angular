import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {

  currentCart: any;
  totalPriceCart: number;
  price$: Subject<any>;
  cart$: Subject<any[]>;

  constructor() {
    this.currentCart = [];
    this.totalPriceCart = 0;
    this.price$ = new BehaviorSubject<any>(null);
    this.cart$ = new BehaviorSubject<any[]>([]);
  }

  updateTotalPriceCart() {
    if (localStorage.getItem('cart')) {
      this.currentCart = JSON.parse(localStorage.getItem('cart'));
    }
    this.totalPriceCart = 0;
    this.currentCart.map((item: any) => {
      this.totalPriceCart += item.total;
    });
    this.price$.next(this.totalPriceCart);
  }

  removeItemCart(id: any) {
    let indexItemRemove = this.currentCart.findIndex((item: any) => item.id === id);
    this.currentCart.splice(indexItemRemove, 1);
    localStorage.setItem('cart', JSON.stringify(this.currentCart));
    this.cart$.next(this.currentCart);
  }

  updateQuantityItemCart(id: any, newQuantity: number) {
    let indexItemRemove = this.currentCart.findIndex((item: any) => item.id === id);
    this.currentCart[indexItemRemove].quantity = newQuantity;
    this.currentCart[indexItemRemove].total = newQuantity * this.currentCart[indexItemRemove].price;
    localStorage.setItem('cart', JSON.stringify(this.currentCart));
    this.cart$.next(this.currentCart);
  }
}

export const CART_PROVIDERS: any[] = [
  CartService
];
