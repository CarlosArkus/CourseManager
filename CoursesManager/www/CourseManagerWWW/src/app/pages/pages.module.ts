import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages.routing';

import { SharedModule } from '../shared/shared.module';

import { MainPageComponent } from './main-page/main-page.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    MainPageComponent,
    NotfoundComponent
  ],
  exports: [
    MainPageComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
