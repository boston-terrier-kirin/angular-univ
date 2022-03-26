import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
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

  ngOnInit() {
    const http$ = new Observable<CoursesResponse>((subscriber) => {
      fetch('/api/courses')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          subscriber.next(json);
          subscriber.complete();
        })
        .catch((err) => {
          console.log(err);
        });
    }).pipe(
      map((courses) => {
        return courses['payload'];
      })
    );

    http$.subscribe({
      next: (value) => {
        console.log('next', value);
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
