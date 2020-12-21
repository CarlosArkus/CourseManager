import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserCoursesService } from '../../user-courses.service';
import { UserCourseAddComponent } from '../user-course-add/user-course-add.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-course-delete',
  templateUrl: './user-course-delete.component.html',
  styleUrls: ['./user-course-delete.component.scss']
})
export class UserCourseDeleteComponent implements OnInit, OnDestroy {

  userCourseSub!: Subscription;

  constructor(
    private userCourseService: UserCoursesService,
    public dialogRef: MatDialogRef<UserCourseAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    this.userCourseSub = this.userCourseService.deleteUserCourse(this.data.userCourseId)
      .subscribe((res: any) => {
        this.dialogRef.close();
        Swal.fire('Success', 'User course deleted', 'success');
      },
        err => { Swal.fire('Error', err.error.message, 'error') }
      );
  }

  ngOnDestroy(): void {
    if (this.userCourseSub) this.userCourseSub.unsubscribe();
  }
}
