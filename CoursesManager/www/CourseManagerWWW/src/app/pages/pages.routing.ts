import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    //Main component loads all the secondary views, 
    //Ex. UserCoursesView component
    path: 'pages',
    component: MainPageComponent,
    children: [
      { path: 'usercourses', loadChildren: () => import(`./user-courses/user-courses.module`).then(m => m.UserCoursesModule) },
      // Add another path in case we use another views
      //another child component
      //Ex. { path: 'tasks', loadChildren: () => import(`./tasks/tasks.module`).then(m => m.TasksModule) },
      { path: '', pathMatch: 'full', redirectTo: 'usercourses' },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
