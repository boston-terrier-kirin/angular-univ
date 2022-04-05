import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  course!: Course;
  lessons: Lesson[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  displayedColumns = ['seqNo', 'description', 'duration'];

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loadLessons();
  }

  loadLessons() {
    this.loading = true;
    this.coursesService
      .findLessons(this.course.id, 'asc', 0, 3)
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
