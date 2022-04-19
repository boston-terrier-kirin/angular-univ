import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LessonDetail } from '../model/lesson-detail';
import { CoursesService } from './courses.service';

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private coursesService: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonDetail> {
    // http://localhost:4200/courses/angular-router-course/lessons/1

    // angular-router-courseの部分はparentから取得する。
    const url = route.parent?.paramMap.get('courseUrl');
    // lessonSeqNoは、自分から取得する。
    const lessonSeqNo = route.paramMap.get('lessonSeqNo');

    /**
     * TODO:
     * こういう場合はどうすれば？
     */
    if (url && lessonSeqNo) {
      console.log('LessonDetailResolve', url, lessonSeqNo);
      return this.coursesService.loadLessonDetail(url, lessonSeqNo);
    }

    /**
     * これで良いのだろうか？
     */
    return throwError(() => {
      return 'Course url not supplied.';
    });
  }
}
