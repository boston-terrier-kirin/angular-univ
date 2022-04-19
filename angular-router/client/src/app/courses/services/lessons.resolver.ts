import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LessonSummary } from '../model/lesson-summary';
import { CoursesService } from './courses.service';

@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonSummary[]> {
    /**
     * TODO:
     * こういう場合はどうすれば？
     */
    const url = route.paramMap.get('courseUrl');

    if (url) {
      return this.coursesService.loadAllCourseLessonsSummary(url);
    }

    /**
     * これで良いのだろうか？
     */
    return throwError(() => {
      return 'Course url not supplied.';
    });
  }
}
