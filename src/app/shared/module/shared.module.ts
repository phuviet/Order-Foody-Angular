import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CustomDialogDirective } from '../../shared/directive/dialog/custom-dialog.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    CustomDialogDirective
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    CustomDialogDirective
  ]
})
export class SharedModule { }
