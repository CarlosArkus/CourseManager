import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCoursesListComponent } from './pages/user-courses-list/user-courses-list.component';
import { UserCourseAddComponent } from './pages/user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from './pages/user-course-delete/user-course-delete.component';



@NgModule({
  declarations: [UserCoursesListComponent, UserCourseAddComponent, UserCourseDeleteComponent],
  exports: [UserCoursesListComponent],
  imports: [
    CommonModule,
  ]
})
export class UserCoursesModule { }
