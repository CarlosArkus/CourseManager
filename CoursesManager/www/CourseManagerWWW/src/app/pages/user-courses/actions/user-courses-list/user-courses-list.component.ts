import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserCoursesService } from '../../user-courses.service';
import { AuthService } from 'src/app/auth/auth.service';

import { UserCourseAddComponent } from '../user-course-add/user-course-add.component';
import { UserCourseDeleteComponent } from '../user-course-delete/user-course-delete.component';
import { UserCourseUpdateComponent } from '../user-course-update/user-course-update.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-courses-list',
  templateUrl: './user-courses-list.component.html',
  styleUrls: ['./user-courses-list.component.scss']
})
export class UserCoursesListComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  displayedColumns: string[] = ['user', 'course', 'url', 'time'];
  dataSource: any;
  searchText: string = ''
  displayedColumns$: Observable<string[]> = of(this.displayedColumns);
  subscription!: Subscription;

  constructor(
    public authService: AuthService,
    private userCourseService: UserCoursesService,
    public dialog: MatDialog) {
    this.isLoggedIn$ = authService.loggedIn;
  }

  ngOnInit(): void {
    this.isLoggedIn$.pipe(
      mergeMap((res: any) => this.userCourseService.getUserCourses()),
    ).subscribe((resFinal: any) => {
      this.dataSource = new MatTableDataSource(resFinal);
      //TODO: alert success
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    );
    this.getDisplayedColumns();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDisplayedColumns() {
    this.subscription = this.isLoggedIn$.subscribe(obs => {
      if (obs) {
        this.displayedColumns$ = of([...this.displayedColumns, 'actions']);
      }
      else {
        this.displayedColumns$ = of(this.displayedColumns);
      }
    })
  }

  filterTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openAddCourse(): void {
    const dialogRef = this.dialog.open(UserCourseAddComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      mergeMap((res: any) => this.userCourseService.getUserCourses()),
    ).subscribe((resFinal: any) => {
      this.dataSource = new MatTableDataSource(resFinal);
      //TODO: alert success
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    );
  }

  openDeleteDialog(userCourseId: string) {
    const dialogRef = this.dialog.open(UserCourseDeleteComponent, {
      width: '500px',
      data: { userCourseId },
    });

    dialogRef.afterClosed().pipe(
      mergeMap(res => this.userCourseService.getUserCourses()),
    ).subscribe((resFinal: any) => {
      this.dataSource = new MatTableDataSource(resFinal);
      //TODO: alert success
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    );
  }

  openUpdateDialog(userCourse: any) {
    const dialogRef = this.dialog.open(UserCourseUpdateComponent, {
      width: '500px',
      data: { userCourse }
    });

    dialogRef.afterClosed().pipe(
      mergeMap(res => this.userCourseService.getUserCourses()),
    ).subscribe((resFinal: any) => {
      this.dataSource = new MatTableDataSource(resFinal);
      //TODO: alert success
    },
      err => { Swal.fire('Error', err.error.message, 'error') }
    )
  }

}