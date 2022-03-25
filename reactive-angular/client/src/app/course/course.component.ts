import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course | null;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  data$ = new Observable<CourseData>();

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (courseId) {
      const course$ = this.coursesService.loadCourseById(courseId).pipe(
        // comnbineLatestはcourse$とlessons$の初回レスポンスを待ってしまうので、
        // 初回レスポンスとしてnullをセットする。
        startWith(null)
      );

      const lessons$ = this.coursesService.loadAllCourseLessons(courseId).pipe(
        // comnbineLatestはcourse$とlessons$の初回レスポンスを待ってしまうので、
        // 初回レスポンスとして[]をセットする。
        startWith([])
      );

      const loadLessons$ =
        this.loadingService.showLoaderUntilComplete<Lesson[]>(lessons$);

      this.data$ = combineLatest([course$, loadLessons$]).pipe(
        // combineLatestで2つを束ねているが、combineLatestは両方の最新レスポンスを待ってしまう。
        // startWithで初期値を持たせることで解決する。
        map(([course, lessons]) => {
          return {
            course,
            lessons,
          };
        }),
        tap((value) => console.log(value))
      );

      //・初回はすぐに、初期値が返る
      //  {course: null, lessons: Array(0)}
      //・次に、couserが返る
      //  {course: {…}, lessons: Array(0)}
      //・次に、lessonsが返る
      //  {course: {…}, lessons: Array(11)}
    }
  }
}
