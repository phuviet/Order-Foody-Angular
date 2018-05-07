import { NgModule } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng/primeng';
import { DataTableModule, CheckboxModule, CalendarModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../module/shared.module';
import { DialogComponent } from './dialog.component';
import { DialogService } from '../../service/dialog/dialog.service';
import { CheckOutOrderModule } from '../../../features/cart/checkout-order/checkout-order.module';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    RouterModule,
    TranslateModule,
    DataTableModule,
    CheckboxModule,
    CalendarModule,
    FormsModule,
    ConfirmDialogModule,
    SharedModule,
    CustomFormsModule,
    ReactiveFormsModule,
    /* the area for dynamic component */
    CheckOutOrderModule
  ],
  declarations: [DialogComponent],
  providers: [ConfirmationService, DialogService],
  exports: [DialogComponent]
})
export class CustomDialogModule { }
