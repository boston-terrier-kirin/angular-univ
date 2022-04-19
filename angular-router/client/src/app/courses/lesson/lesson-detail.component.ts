import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LessonDetail } from '../model/lesson-detail';

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson: LessonDetail | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('LessonDetailComponent.constructor');
  }

  ngOnInit() {
    // LessonsListComponentとやりかたを変えて、Observableにしてみたけど、やっぱりNG。
    // this.lesson$ = this.route.snapshot.data['lesson'];

    /**
     * ngOnInitは1回しか呼ばれていないので、prev/nextを読んでも新しいLessonが取得されない。
     * snapshotは文字通り最初の1回しか呼ばれない。
     */
    // this.lesson = this.route.snapshot.data['lesson'];

    // Obsevableに変えることで解決。
    // この例ではparamではなく、data。
    this.route.data
      .pipe(
        map((data) => {
          console.log('LessonDetailComponent.ngOnInit', data);
          return data['lesson'];
        })
      )
      .subscribe({
        next: (data) => {
          this.lesson = data;
        },
        complete: () => {
          // このケースはcompleteしないため、async pipe を使うのが正解。
          console.log('LessonDetailComponent.complete');
        },
      });
  }

  prev(lesson: LessonDetail) {
    console.log('LessonDetailComponent.prev');

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
    console.log('LessonDetailComponent.next');

    this.router.navigate(['lessons', lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
