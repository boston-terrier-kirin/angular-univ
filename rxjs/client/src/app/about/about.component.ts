import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  concat,
  fromEvent,
  interval,
  merge,
  of,
  Subject,
  timer,
} from 'rxjs';
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

  behaviorSubject() {
    const subject = new BehaviorSubject(0);
    const value$ = subject.asObservable();
    value$.subscribe((value) => {
      console.log('nextする前にsubscribe', value);
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);

    setTimeout(() => {
      value$.subscribe((value) => {
        // 最後の値が取得できる。
        console.log('nextした後にsubscribe', value);
      });
    }, 5000);
  }

  subject() {
    const subject = new Subject();
    const value$ = subject.asObservable();
    value$.subscribe((value) => {
      console.log('nextする前にsubscribe', value);
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);

    setTimeout(() => {
      value$.subscribe((value) => {
        // これは呼ばれない
        console.log('nextした後にsubscribe', value);
      });
    }, 5000);
  }

  merge() {
    const one$ = interval(1000);
    const two$ = one$.pipe(map((value) => value * 10));

    merge(one$, two$).subscribe((values) => {
      console.log(values);
    });
  }

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
