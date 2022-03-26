import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from '../model/course';

interface CoursesResponse {
  [payload: string]: Course[];
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$ = new Observable<Course[]>();
  advancedCourses$ = new Observable<Course[]>();

  constructor() {}

  ngOnInit() {
    const courses$ = createHttpObservable<CoursesResponse>('/api/courses').pipe(
      /**
       * BEGINNERとADVANCEDで2回呼び出しているので、エラーになるときは2回エラーになってしまう。
       * 2回エラーになるのを防ぐのであれば、catchErrorを上に持ってくる。
       */
      catchError((err) => {
        console.error('💥', err);

        // 元のobservableをエラーで置き換えるパターン。
        return throwError(() => new Error(err));

        // 初期値を表示するパターン。
        // return of([
        //   {
        //     id: 0,
        //     description: 'Error occurred',
        //     iconUrl: '',
        //     courseListIcon: '',
        //     longDescription: 'Something went wrong. Please try later',
        //     category: 'BEGINNER',
        //     lessonsCount: 0,
        //   },
        // ]);
      }),
      map((res) => res['payload']),
      shareReplay(),
      finalize(() => {
        console.log('finalize');
      })
    );

    this.beginnerCourses$ = courses$.pipe(
      tap((courses) => console.log(courses)),
      map((courses) =>
        courses.filter((course) => course.category === 'BEGINNER')
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === 'ADVANCED')
      )
    );
  }
}
