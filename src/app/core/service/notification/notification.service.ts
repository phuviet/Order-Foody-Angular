import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Msg {
  type?: string;
  msg?: string;
  msgObj?: any;
  sub?: Array<string>;
  link?: any;
  timeout?: number;
}

export interface Dialog {
  type?: string;
  header?: string;
  content?: string;
  contentObj?: any;
  contentType?: string;
  btnAccept?: any;
  btnClose?: any;
  btnReject?: any;
}

@Injectable()
export class NotificationService {

  private dialog$: Subject<any>;
  private dialogCallback$: Subject<any>;
  private error$: Subject<any>;
  private progressBar$: Subject<boolean>;
  private cart$: BehaviorSubject<any>;
  private dynamicDialog$: BehaviorSubject<any>;

  constructor() {
    this.dialog$ = <Subject<any>>new Subject();
    this.dialogCallback$ = <Subject<boolean>>new Subject();
    this.error$ = <Subject<any>>new Subject();
    this.progressBar$ = <Subject<boolean>>new Subject();
    this.cart$ = <BehaviorSubject<any>>new BehaviorSubject<any>(null);
    this.dynamicDialog$ = <BehaviorSubject<any>>new BehaviorSubject<any>(null);
  }

  /**
   * [progress description]
   * @method progress
   * @param  {boolean = true}        show [description]
   * @return {[type]}       [description]
   */
  progress(show: boolean = true) {
    this.progressBar$.next(show);
    return show;
  }

  progressing(): Observable<boolean> {
    return this.progressBar$.asObservable();
  }

  /**
   * [progress description]
   * @method progress
   * @param  {boolean = true}        show [description]
   * @return {[type]}       [description]
   */
  dialog(dialog: any = null, isDynamic: boolean = false) {
    this.dialog$.next({ dialog: dialog, isDynamic: isDynamic });
    return this.dialogCallback$.asObservable().first();
  }

  dialogCallback(confirm: boolean = false) {
    this.dialogCallback$.next(confirm);
  }

  dialogObserver(): Observable<boolean> {
    return this.dialog$.asObservable();
  }


  /**
   *[cart description]
   * @method cart
   */

   cart(product: any, quantity?: number) {
     if (product) {
       this.cart$.next({
         product: product,
         quantity: quantity
        });
     } else {
       this.cart$.next(null);
     }
     return product;
   }

   cartObserver(): Observable<any> {
     return this.cart$.asObservable();
   }

   dynamicDialog(dynamicDialogData: any) {
    this.dynamicDialog$.next(dynamicDialogData);
    return dynamicDialogData;
  }

  dynamicDialogObserver(): Observable<any> {
    return this.dynamicDialog$.asObservable();
  }

  /**
   * [progress description]
   * @method progress
   * @param  {boolean = true}        show [description]
   * @return {[type]}       [description]
   */
  message(msg: Msg = null) {
    this.error$.next(msg);
  }

  errorHandling(): Observable<boolean> {
    return this.error$.asObservable();
  }

}

export const NOTIFICATION_PROVIDERS: any[] = [
  NotificationService
];
