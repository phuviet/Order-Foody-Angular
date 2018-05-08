import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService, CartService, AuthService } from '../../core/service/index';
import { DialogItem } from '../../shared/service/dialog/dialog-item';
import { CheckoutOrderComponent } from './checkout-order/checkout-order.component';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { phoneNumberValidator } from '../../shared/function/form-validator';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  form: FormGroup;
  currentCart: any;
  totalPriceCart: number;

  constructor(
    private cart: CartService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private api: ApiService
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

  initForm() {
    this.form = this.fb.group({
      receiver: ['Nguyễn Phú Việt', Validators.required],
      address: ['Thọ An, Thọ Quang, Sơn Trà, Đà Nẵng', Validators.required],
      phone: ['0935815255', Validators.compose([
        phoneNumberValidator,
        Validators.required
      ])]
    });
  }

  checkoutCart() {
    this.initForm();
    let dialog = {
      type: 'confirm',
      contentObj: {
        form: this.form,
        cart: this.currentCart
      },
      btnAccept: {
        txt: 'action.check_out',
        cls: 'btn-primary'
      },
      btnReject: {
        txt: 'action.close',
        cls: 'btn-default'
      }
    }
    this.ns.dialog(new DialogItem(CheckoutOrderComponent, dialog), true).subscribe(
      (accept: boolean) => {
        let dialog = this.ns.dynamicDialogObserver().subscribe((dataRequest: any) => {
          console.log(dataRequest);
          this.submitOrder(dataRequest);
        });
        dialog.unsubscribe()
      }
    )
  }

  submitOrder(dataRequest: any) {
    this.api.post(['orders'], dataRequest).subscribe(
      (data: any) => {
        this.currentCart = [];
        this.cart.updateTotalPriceCart();
        this.cart.updateTotalItem();
        this.ns.message({
          type: 'success',
          msg: 'order.submit_success'
        })
      }, (error: any) => {
        //
      }, () => {
        //
      }
    )
  }
}
