import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page.component';
import { UserCoursesListComponent } from '../../user-courses/pages/user-courses-list/user-courses-list.component';
import { UserCourseAddComponent } from '../../user-courses/pages/user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from '../../user-courses/pages/user-course-delete/user-course-delete.component';

const routes: Routes = [
  {
    path: 'users-courses',
    component: MainPageComponent,
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
export class MainRoutingModule { }
