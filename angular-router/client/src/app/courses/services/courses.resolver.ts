import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { first, Observable, throwError } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';

@Injectable()
export class CoursesResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    // localhost:4200/courses/angular-router-course

    /**
     * TODO:
     * こういう場合はどうすれば？
     */
    const url = route.paramMap.get('courseUrl');

    if (url) {
      return this.coursesService.loadCourseByUrl(url);
    }

    /**
     * これで良いのだろうか？
     */
    return throwError(() => {
      return 'Course url not supplied.';
    });
  }
}
