import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { concat, fromEvent, switchMap, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$ = new Observable<Course>();
  lessons$ = new Observable<Lesson[]>();
  courseId = '';

  @ViewChild('searchInput', { static: true }) input!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
  }

  // VERSION2
  ngAfterViewInit() {
    this.lessons$ = fromEvent<InputEvent>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event: Event) => {
        return (event.target as HTMLInputElement).value;
      }),
      // startWith('')で検索条件初期値を設定しても同じことができる。
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => {
        // switchMapは後勝ち。検索がかぶったら、キャンセルして新しいリクエストを出す。
        return this.loadLessons(search);
      })
    );
  }

  // VERSION1
  // ngAfterViewInit() {
  //   // 検索初期値
  //   const initialLessons$ = this.loadLessons();
  //
  //   // インクリメンタルサーチ
  //   const searchLessons$ = fromEvent<InputEvent>(
  //     this.input.nativeElement,
  //     'keyup'
  //   ).pipe(
  //     map((event: Event) => {
  //       return (event.target as HTMLInputElement).value;
  //     }),
  //     debounceTime(400),
  //     distinctUntilChanged(),
  //     switchMap((search) => {
  //       // switchMapは後勝ち。検索がかぶったら、キャンセルして新しいリクエストを出す。
  //       return this.loadLessons(search);
  //     })
  //   );
  //
  //   // 2つの結果をconcat
  //   this.lessons$ = concat(initialLessons$, searchLessons$);
  // }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res: any) => res['payload']));
  }
}
