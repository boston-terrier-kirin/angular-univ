import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]> = new Observable();
  advancedCourses$: Observable<Course[]> = new Observable();

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      // beginnerCourses$とadvancedCourses$の両方でsubscribeしているので2回リクエストが流れるのを、shareReplayで防ぐ。
      shareReplay(),
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err) => {
        const message = 'Could not load courses';
        this.messagesService.showErrors(message);

        // throwErrorで元のobservableを置き換える。
        return throwError(() => new Error(err));
      })
    );

    const loadCourses$ =
      this.loadingService.showLoaderUntilComplete<Course[]>(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === 'BEGINNER')
      )
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === 'ADVANCED')
      )
    );
  }
}
