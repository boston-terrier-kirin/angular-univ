import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

interface CoursesResponse {
  [payload: string]: Course[];
}

interface CourseLessonsResponse {
  [payload: string]: Lesson[];
}

interface LessonsResponse {
  [payload: string]: Lesson[];
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

  loadCourseById(courseId: string): Observable<Course> {
    return this.httpClient
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: string): Observable<Lesson[]> {
    return this.httpClient
      .get<CourseLessonsResponse>(`/api/lessons`, {
        params: {
          courseId,
          pageSize: '10000',
        },
      })
      .pipe(
        map((res) => res['payload']),
        shareReplay()
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.httpClient
      .get<LessonsResponse>('/api/lessons', {
        params: {
          filter: search,
          pageSize: '100',
        },
      })
      .pipe(
        map((res) => res['payload']),
        shareReplay()
      );
  }
}
