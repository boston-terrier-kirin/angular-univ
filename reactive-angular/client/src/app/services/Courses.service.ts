import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';

interface CoursesResponse {
  [payload: string]: Course[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    return this.httpClient
      .get<CoursesResponse>('/api/courses')
      .pipe(map((res) => res['payload']));
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }
}
