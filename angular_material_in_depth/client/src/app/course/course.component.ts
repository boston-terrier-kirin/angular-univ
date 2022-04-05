import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    this.coursesService
      .findLessons(this.course.id, 'asc', 0, 3)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((lessons) => {
        this.lessons = lessons;
      });
  }
}
