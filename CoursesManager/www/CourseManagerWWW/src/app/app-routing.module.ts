import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [

  //All primary routes
  // path 'pages' loads the main-page component,
  { path: 'pages', loadChildren: () => import(`./pages/pages.module`).then(m => m.PagesModule) },
  //Ex. another principal view
  // path 'example' load the example-page component
  // { path: 'example', loadChildren: () => import(`./example/example.module`).then(m => m.ExampleModule) },

  //We can create a home Component and redirect to it
  //For now we redirect to /pages/usercourses
  { path: '', redirectTo: '/pages/usercourses', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
