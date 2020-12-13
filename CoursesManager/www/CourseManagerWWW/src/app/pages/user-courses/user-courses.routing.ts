import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserCoursesViewComponent } from './user-courses-view.component';
import { UserCoursesListComponent } from './actions/user-courses-list/user-courses-list.component';
import { UserCourseAddComponent } from './actions/user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from './actions/user-course-delete/user-course-delete.component';

const routes: Routes = [
  {
    //Name path comes from pages.routing.ts
    path: '',
    component: UserCoursesViewComponent,
    children: [
      { path: '', component: UserCoursesListComponent },
      { path: 'add', component: UserCourseAddComponent },
      { path: 'delete', component: UserCourseDeleteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCoursesRoutingModule { }
