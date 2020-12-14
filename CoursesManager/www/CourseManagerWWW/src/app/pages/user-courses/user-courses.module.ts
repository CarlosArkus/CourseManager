import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { UserCoursesRoutingModule } from './user-courses.routing';

import { UserCoursesViewComponent } from './user-courses-view.component';
import { UserCoursesListComponent } from './actions/user-courses-list/user-courses-list.component';
import { UserCourseAddComponent } from './actions/user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from './actions/user-course-delete/user-course-delete.component';

@NgModule({
  declarations: [
    UserCoursesListComponent,
    UserCourseAddComponent,
    UserCourseDeleteComponent,
    UserCoursesViewComponent
  ],
  exports: [UserCoursesViewComponent],
  imports: [
    CommonModule,
    UserCoursesRoutingModule,
    MaterialModule
  ]
})
export class UserCoursesModule { }
