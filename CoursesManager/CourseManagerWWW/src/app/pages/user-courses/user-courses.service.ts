import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TimeFormat } from 'src/app/utilities/TimeFormat';

const base_url = environment.base_url;

interface UserCourse {
  time: number,
  courseID: string,
  userCourseId?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  timeFormat = new TimeFormat();
  constructor(private http: HttpClient) {
  }

  getUserCourses() {
    return this.http.get(`${base_url}/courses/list`)
      .pipe(
        map((res: any) => {
          if (localStorage.getItem('userId')) {
            const datalogeado = res.data.filter((f: any) => f.user.id === localStorage.getItem('userId'));
            return datalogeado.map((m: any) => {
              return {
                username: m.user.name,
                formatedTime: this.timeFormat.minutesToFormat(m.courseTime),
                ...m
              }
            })
          }
          else {
            return res.data.map((m: any) => {
              return {
                username: m.user.name,
                formatedTime: this.timeFormat.minutesToFormat(m.courseTime),
                ...m
              }
            })
          }
        }),
      );
  }

  addUserCourses(formData: UserCourse) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token') || '' //service getting auth-token
    });

    const options = { headers };

    return this.http.post(`${base_url}/courses/add`, formData, options);
  }

  updateUserCourse(formData: UserCourse) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token') || '' //service getting auth-token
    });

    const options = { headers };

    return this.http.put(`${base_url}/courses/update`, formData, options);
  }

  deleteUserCourse(userCourseId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('auth-token') || '' //service getting auth-token
    });

    const options = { headers };

    return this.http.delete(`${base_url}/courses/delete/${userCourseId}`, options);
  }

}
