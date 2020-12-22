import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MainService } from '../../../../main.service';
import { Subscription } from 'rxjs';
import { UserCoursesService } from '../../user-courses.service';
import Swal from 'sweetalert2';

interface course {
  courseId: string,
  courseName: string
}
@Component({
  selector: 'app-user-course-add',
  templateUrl: './user-course-add.component.html',
  styleUrls: ['./user-course-add.component.scss']
})
export class UserCourseAddComponent implements OnInit, OnDestroy {

  courses: course[] = [];
  courseSubscription!: Subscription;

  atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup,
  ): ValidationErrors | null => {
    const hasAtLeastOne =
      group &&
      group.controls &&
      Object.keys(group.controls).some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : { atLeastOne: true };
  };

  timeForm: FormGroup = this.fb.group({
    days: [],
    hours: [],
    minutes: [],
  }, { validators: this.atLeastOne(Validators.required) });

  addCourseForm: FormGroup = new FormGroup({
    time: this.timeForm,
    'courseId': new FormControl(null, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private userCourseService: UserCoursesService,
    public dialogRef: MatDialogRef<UserCourseAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.courseSubscription = this.mainService.getCourses().subscribe(res => {
      this.courses = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const minutes = (
      (this.timeForm.controls.days.value * 24 * 60) +
      (this.timeForm.controls.hours.value * 60) +
      (+this.timeForm.controls.minutes.value)
    );

    const userCourse = {
      time: minutes,
      courseID: this.addCourseForm.controls.courseId.value
    };

    this.userCourseService.addUserCourses(userCourse).subscribe((res: any) => {
      // alert success
      this.dialogRef.close();
      Swal.fire('Success', 'User course added', 'success');
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    );
  }

  atLeastOneRequired() {

  }

}
