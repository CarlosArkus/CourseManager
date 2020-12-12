import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainRoutingModule } from './pages/main-page/main.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/users-courses', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    MainRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
