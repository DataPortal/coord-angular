import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from '@coord-angular/core';

import {environment} from '@env/environment';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    pan: {direction: Hammer.DIRECTION_ALL },
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', loadChildren: '@coord-angular/home#HomeModule'},
        {path: 'dashboard', loadChildren: '@coord-angular/dashboard#DashboardModule'},
        {path: '404', loadChildren: '@coord-angular/not-found#NotFoundModule'},
        // 404 should be last
        {path: '**', redirectTo: '404', pathMatch: 'full'}
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        initialNavigation: 'enabled',
        preloadingStrategy: PreloadAllModules,
        paramsInheritanceStrategy: 'always'
        // onSameUrlNavigation: 'reload'
      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    CoreModule, // IMP: Please keep CoreModule after RouterModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
