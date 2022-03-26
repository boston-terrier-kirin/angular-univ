import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
      map((res) => res['payload']),
      shareReplay()
    );

    this.beginnerCourses$ = courses$.pipe(
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
