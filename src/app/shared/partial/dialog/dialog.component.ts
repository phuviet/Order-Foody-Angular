import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NotificationService, Dialog } from '../../../core/service/index';
import * as moment from 'moment';
import { cloneDeep } from '../../function/data';
import { DialogService } from '../../service/dialog/dialog.service';
import { CustomDialogDirective } from '../../directive/dialog/custom-dialog.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements AfterViewInit {

  @ViewChild(CustomDialogDirective) customDialogDirective: CustomDialogDirective;

  isVisible: boolean;
  dialog: any;
  default: any;
  isDynamic: boolean;

  constructor(
    private ns: NotificationService,
    private dialogService: DialogService
  ) {
    this.isVisible = false;
    this.dialog = {};
    this.default = {
      alert: {
        type: 'alert',
        header: 'dialog.alert.header',
        btnClose: {
          txt: 'action.close',
          cls: 'btn-default'
        }
      },
      confirm: {
        type: 'confirm',
        header: 'dialog.confirm.header',
        content: 'dialog.confirm.content',
        contentObj: null,
        btnAccept: {
          txt: 'action.yes',
          cls: 'btn-warning'
        },
        btnReject: {
          txt: 'action.cancel',
          cls: 'btn-default'
        }
      }
    };
  }

  ngAfterViewInit() {
    this.ns.dialogObserver().subscribe((config: any = null) => {
      if (config) {
        this.isDynamic = config.isDynamic;
        this.show(config.dialog);
      } else {
        //
      }
    });
  }

  show(config: any) {
    let defaultClone: any;
    let type: any;
    if (this.isDynamic) {
      type = config.dialog.type === 'confirm' ? 'confirm' : 'alert';
      defaultClone = cloneDeep(this.default[type]);
      config.dialog = Object.assign({}, defaultClone, config.dialog);
      this.dialogService.loadComponent(this.customDialogDirective.viewContainerRef, config);
    } else {
      type = config.type === 'confirm' ? 'confirm' : 'alert';
      defaultClone = cloneDeep(this.default[type]);
      this.dialog = Object.assign({}, defaultClone, config);
      this.isVisible = true;
    }
  }

  close() {
    this.ns.dialogCallback(false);
    this.dialog = {};
    this.isVisible = false;
  }

  accept() {
    this.ns.dialogCallback(true);
    this.close();
  }
}
