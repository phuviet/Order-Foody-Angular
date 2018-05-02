import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, CartService, AuthService } from '../../../core/service/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  userInfo: any;
  categories: any;
  topNewestProduct: any;
  currentCart: any;
  totalPriceCart: number;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private cart: CartService,
    private auth: AuthService
  ) {
    this.userInfo = this.auth.getUserInfo();
    this.topNewestProduct = [];
  }

  ngOnInit() {
    this.ns.cartObserver().subscribe((data: any) => {
      if (data) {
        this.checkExistProductInCart(data);
      }
    });
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
    this.fetchData();
  }

  checkExistProductInCart(data: any) {
    if (localStorage.getItem('cart')) {
      this.currentCart = JSON.parse(localStorage.getItem('cart'));
    }
    let existItemIndex = this.currentCart.findIndex((item) => item.id === data.product.id);
    if (existItemIndex !== -1) {
      this.currentCart[existItemIndex].quantity += data.quantity;
      this.currentCart[existItemIndex].total = this.currentCart[existItemIndex].quantity * this.currentCart[existItemIndex].price;
    } else {
      data.product.total = data.product.price * data.quantity;
      data.product.quantity = data.quantity;
      this.currentCart.push(data.product);
    }
    localStorage.setItem('cart', JSON.stringify(this.currentCart));
    this.cart.updateTotalPriceCart();
  }

  removeItemCart(id: any) {
    this.cart.removeItemCart(id);
    this.cart.updateTotalPriceCart();
  }

  logout() {
    this.auth.logout();
  }
   
  fetchData() {
    this.api.multiple(
      { uri: ['categories'], method: 'GET' },
      { uri: ['products', 'newest'], method: 'GET' }
    ).subscribe(
      (data: any) => {
        if (data[0]) {
          this.categories = data[0];
        }
        if (data[1]) {
          this.topNewestProduct = data[1];
        }
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
