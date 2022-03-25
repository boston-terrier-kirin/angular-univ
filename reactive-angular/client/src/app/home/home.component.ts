import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStoreService } from '../services/courses.store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]> = new Observable();
  advancedCourses$: Observable<Course[]> = new Observable();

  constructor(private coursesStoreService: CoursesStoreService) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ =
      this.coursesStoreService.filterByCategory('BEGINNER');

    this.advancedCourses$ =
      this.coursesStoreService.filterByCategory('ADVANCED');
  }
}
