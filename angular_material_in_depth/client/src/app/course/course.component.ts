import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { merge, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course!: Course;
  lessons: Lesson[] = [];
  loading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['seqNo', 'description', 'duration'];
  expandedLesson: Lesson | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loadLessons();

    console.log(this.course.lessonsCount);
  }

  ngAfterViewInit(): void {
    // paginatorはngOnInitのタイミングでは初期化されていない。
    // mergeを使ったバージョン
    // merge(this.paginator.page, this.sort.sortChange)
    //   .pipe(
    //     tap(() => {
    //       this.loadLessons();
    //     })
    //   )
    //   .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          // ページングを変えたタイミングでイベントがemitされるので、その都度検索しに行ける。
          console.log(`pageIndex: ${this.paginator.pageIndex}`);
          console.log(`pageSize: ${this.paginator.pageSize}`);
          this.loadLessons();
        })
      )
      .subscribe();

    this.sort.sortChange
      .pipe(
        tap(() => {
          console.log(`sort: ${this.sort.direction}`);
          console.log(`sort: ${this.sort.active}`);
          this.paginator.pageIndex = 0;
          this.loadLessons();
        })
      )
      .subscribe();
  }

  loadLessons() {
    this.loading = true;
    this.coursesService
      .findLessons(
        this.course.id,
        // sort/paginatorはngOnInitのタイミングでは初期化されていないので、デフォルト値を設定する。
        this.sort?.direction ?? 'asc',
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 5,
        this.sort?.active ?? 'seqNo'
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((lessons) => {
        this.lessons = lessons;
      });
  }

  toggleLesson(lesson: Lesson) {
    if (lesson === this.expandedLesson) {
      // lesson === this.expandedLesson ということは同じ行を2回クリックしたということなので、閉じる。
      this.expandedLesson = null;
      return;
    }

    this.expandedLesson = lesson;
  }
}
