import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { MainService } from '../../../../main.service';
import { UserCoursesService } from '../../user-courses.service';
import { TimeFormat } from '../../../../utilities/TimeFormat';
import Swal from 'sweetalert2';

interface course {
  courseId: string,
  courseName: string
}

@Component({
  selector: 'app-user-course-update',
  templateUrl: './user-course-update.component.html',
  styleUrls: ['./user-course-update.component.scss']
})
export class UserCourseUpdateComponent implements OnInit, OnDestroy {

  timeFormat = new TimeFormat();
  formatedTime: any = {};

  mainSub!: Subscription;
  userCourseSub!: Subscription;

  courses: course[] = [];

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

  updateCourseForm: FormGroup = new FormGroup({
    'time': this.timeForm,
    'courseId': new FormControl(this.data.userCourse.courseID, Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private userCourseService: UserCoursesService,
    public dialogRef: MatDialogRef<UserCourseUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.toTimeObject();
  }

  ngOnInit(): void {
    this.mainSub = this.mainService.getCourses().subscribe((res: any) => {
      this.courses = res;
      this.bindDataToForm();
    },
      err => {
        Swal.fire('Error', 'error getting courses list');
      }
    );
  }

  onNoClick() {
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
      courseID: this.updateCourseForm.controls.courseId.value,
      userCourseId: this.data.userCourse._id
    };

    this.userCourseSub = this.userCourseService.updateUserCourse(userCourse).subscribe((res: any) => {
      // alert success
      this.dialogRef.close();
      Swal.fire('Success', 'User course updated', 'success');
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    );
  }

  bindDataToForm() {
    const timeForm = this.updateCourseForm.controls.time as FormGroup;
    timeForm.controls.days.patchValue(this.formatedTime.days);
    timeForm.controls.hours.patchValue(this.formatedTime.hours);
    timeForm.controls.minutes.patchValue(this.formatedTime.min);
    this.updateCourseForm.controls.courseId.patchValue(this.data.userCourse.courseID);
  }

  toTimeObject() {
    this.formatedTime = this.timeFormat.toTimeSplit(this.data.userCourse.courseTime);
  }

  ngOnDestroy(): void {
    this.mainSub.unsubscribe();
    if (this.userCourseSub) this.userCourseSub.unsubscribe();
  }

}
