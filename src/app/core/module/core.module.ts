import { NgModule, ModuleWithProviders, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { I18N_PROVIDERS } from '../service/i18n/i18n.service';
import { NOTIFICATION_PROVIDERS } from '../service/notification/notification.service';
import { API_PROVIDERS } from '../service/api/api.service';
import { AuthService } from '../service/auth/auth.service';
import { CART_PROVIDERS } from '../service/cart/cart.service';

const AUTH_PROVIDERS = [
  AuthService
];

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        I18N_PROVIDERS,
        API_PROVIDERS,
        AUTH_PROVIDERS,
        NOTIFICATION_PROVIDERS,
        CART_PROVIDERS
      ]
    };
  }
}
