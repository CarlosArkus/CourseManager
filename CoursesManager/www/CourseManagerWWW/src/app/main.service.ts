import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(`${base_url}/courses-list/list`)
      .pipe(
        map((res: any) => res.data.map((m: any) => {
          return {
            courseId: m._id,
            courseName: m.name
          }
        }))
      );
  }

}
