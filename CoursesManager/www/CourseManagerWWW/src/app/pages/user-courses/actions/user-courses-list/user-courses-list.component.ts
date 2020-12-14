import { Component } from '@angular/core';

export interface PeriodicElement {
  user: string;
  course: string;
  url: string;
  time: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    user: 'Carlos',
    course: 'Angular Avanzado',
    url: 'https://www.udemy.com/course/angular-avanzado-fernando-herrera/',
    time: '1 day 0 hours 50 min',
  },
  {
    user: 'Eduardo',
    course: 'React de cero a experto',
    url: 'https://www.udemy.com/course/angular-avanzado-fernando-herrera/',
    time: '2 days 3 hours 5 min',
  },
  {
    user: 'Mauricio',
    course: 'HTML, CSS; JS',
    url: 'https://www.udemy.com/course/aprende-javascript-es9-html-css3-y-nodejs-desde-cero/',
    time: '2 days 3 hours 5 min',
  },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-user-courses-list',
  templateUrl: './user-courses-list.component.html',
  styleUrls: ['./user-courses-list.component.scss']
})
export class UserCoursesListComponent {
  displayedColumns: string[] = ['user', 'course', 'url', 'time'];
  dataSource = ELEMENT_DATA;
}