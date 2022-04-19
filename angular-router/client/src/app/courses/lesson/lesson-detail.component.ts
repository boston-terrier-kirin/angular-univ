import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonDetail } from '../model/lesson-detail';

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  // lesson$ = new Observable<LessonDetail>();
  lesson: LessonDetail | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // LessonsListComponentとやりかたを変えて、Observableにしてみたけど、やっぱりNG。
    // this.lesson$ = this.route.snapshot.data['lesson'];

    this.lesson = this.route.snapshot.data['lesson'];
  }

  prev(lesson: LessonDetail) {
    // 今のurl
    // http://localhost:4200/courses/angular-router-course/lessons/3
    // 　↓
    // 　親
    // http://localhost:4200/courses/angular-router-course
    // 　↓親から見て相対パス
    // http://localhost:4200/courses/angular-router-course/lessons/4

    this.router.navigate(['lessons', lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }

  next(lesson: LessonDetail) {
    this.router.navigate(['lessons', lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
