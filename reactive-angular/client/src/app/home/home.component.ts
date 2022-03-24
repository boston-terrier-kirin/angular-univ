import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/Courses.service';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

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
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      // beginnerCourses$とadvancedCourses$の両方でsubscribeしているので2回リクエストが流れるのを、shareReplayで防ぐ。
      shareReplay(),
      map((courses) => courses.sort(sortCoursesBySeqNo))
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
