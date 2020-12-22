import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MaterialModule } from '../../material.module';

import { UserCoursesRoutingModule } from './user-courses.routing';

import { UserCoursesViewComponent } from './user-courses-view.component';
import { UserCoursesListComponent } from './actions/user-courses-list/user-courses-list.component';
import { UserCourseAddComponent } from './actions/user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from './actions/user-course-delete/user-course-delete.component';
import { UserCourseUpdateComponent } from './actions/user-course-update/user-course-update.component';

@NgModule({
  declarations: [
    UserCoursesListComponent,
    UserCourseAddComponent,
    UserCourseDeleteComponent,
    UserCoursesViewComponent,
    UserCourseUpdateComponent
  ],
  exports: [UserCoursesViewComponent],
  imports: [
    CommonModule,
    UserCoursesRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserCoursesModule { }
