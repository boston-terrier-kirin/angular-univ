import { Component, OnInit } from '@angular/core';
import { concat, fromEvent, interval, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from '../model/course';

interface CoursesResponse {
  [payload: string]: Course[];
}

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  concat() {
    const one$ = of(1, 2, 3);
    const two$ = of(4, 5, 6);

    concat(one$, two$).subscribe((values) => {
      console.log(values);
    });
  }

  courses() {
    const courses$ = createHttpObservable<CoursesResponse>('/api/courses').pipe(
      map((res) => res['payload'])
    );

    courses$.subscribe({
      next: (courses) => {
        console.log('next', courses);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  interval() {
    const interval$ = interval(1000);
    interval$.subscribe((value) => {
      console.log(`stream1: ${value}`);
    });
    interval$.subscribe((value) => {
      console.log(`stream2: ${value}`);
    });
  }

  timer() {
    const timer$ = timer(3000, 1000);
    timer$.subscribe((value) => {
      console.log(value);
    });
  }

  fromEvent() {
    const e$ = fromEvent(document, 'click');
    e$.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
