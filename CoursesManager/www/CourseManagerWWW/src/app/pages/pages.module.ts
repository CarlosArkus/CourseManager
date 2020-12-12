import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    NotfoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
