import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  displayedColumns = ['seqNo', 'description', 'duration'];

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loadLessons();

    console.log(this.course.lessonsCount);
  }

  ngAfterViewInit(): void {
    // paginatorはngOnInitのタイミングでは初期化されていない。
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
  }

  loadLessons() {
    this.loading = true;
    this.coursesService
      .findLessons(
        this.course.id,
        'asc',
        // paginatorはngOnInitのタイミングでは初期化されていないので、デフォルト値を設定する。
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 5
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
}
