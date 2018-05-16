import { Component, OnInit, Input } from '@angular/core';
import { NotificationService, CartService } from '../../../core/service/index';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
declare let paypal: any;
declare let $: any;

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html'
})
export class CheckoutOrderComponent implements OnInit {

  @Input() dialog: any;

  tabCurrent: number;
  currentCart: any;
  totalPriceCart: any;
  totalPriceCartUSD: any;
  form: FormGroup;
  isVisible: boolean;
  statusPayment: any;

  constructor(
    private ns: NotificationService,
    private cart: CartService
  ) {
    this.isVisible = true;
    this.tabCurrent = 0;
    this.totalPriceCart = 0;
    this.totalPriceCartUSD = 0;
  }

  ngOnInit() {
    this.currentCart = this.dialog.contentObj.cart;
    this.currentCart.map((item: any) => {
      this.totalPriceCart += item.total;
    });
    this.form = this.dialog.contentObj.form;
    this.totalPriceCartUSD = this.parseTotalPrice(this.totalPriceCart);
    this.initPaypal();
  }

  parseTotalPrice(totalPrice: any) {
    let array = (this.totalPriceCart / 22000).toString().split('.');
    return array[0] + '.' + (array[1].substring(0, 1));
  }

  initPaypal() {
    $.getScript( 'https://www.paypalobjects.com/api/checkout.js', $.proxy (() => {
      var t = this.totalPriceCartUSD;
      paypal.Button.render({
        env: 'sandbox', // sandbox | production
        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          sandbox: 'AT9VXRIcOpYuD5ZIHwavBfOp8gpFOJOB_Op--_IhRuGtfWjzhSSILZ_nocEcx5RNyw-13kjsHcqOT-gH',
          production: '<insert production client id>'
        },
        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,
        // payment() is called when the button is clicked
        payment: (data, actions) => {
          // Make a call to the REST api to create the payment
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: {
                    total: t,
                    currency: 'USD'
                  }
                }
              ]
            }
          });
        },
        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: (data, actions) => {
          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(() => {
            this.isVisible = false;
            this.statusPayment = 1;
            localStorage.setItem('cart', JSON.stringify([]));
            this.accept();
            // window.alert('Payment Complete!');
          });
        }
      }, '#paypal-button-container');
    }));
  }

  onTabchange(e: any) {
    this.tabCurrent = e.index;
  }

  close() {
    this.ns.dialogCallback(false);
    this.dialog = {};
    this.isVisible = false;
  }

  prepareData() {
    let data: any = {};
    data = Object.assign(this.form.value, {
      cart: this.currentCart,
      status: this.statusPayment
    });
    return data;
  }

  accept() {
    this.ns.dynamicDialog(this.prepareData());
    this.ns.dialogCallback(true);
    this.close();
  }

  gotoTab(isNext: boolean = false) {
    this.tabCurrent = isNext ? ++this.tabCurrent : --this.tabCurrent;
  }
}
