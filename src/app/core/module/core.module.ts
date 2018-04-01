import { NgModule, ModuleWithProviders, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { I18N_PROVIDERS } from '../service/i18n/i18n.service';


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
      providers: [I18N_PROVIDERS]
    };
  }
}
