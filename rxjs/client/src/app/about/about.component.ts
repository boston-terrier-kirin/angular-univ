import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.fromEvent();
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
    e$.subscribe((value) => {
      console.log(value);
    });
  }
}
