import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
})
export class SearchLessonsComponent implements OnInit {
  searchResults$: Observable<Lesson[]> = new Observable();
  activeLesson: Lesson | null = null;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {}

  onSearch(search: string) {
    this.searchResults$ = this.coursesService.searchLessons(search);
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBackToSearch() {
    this.activeLesson = null;
  }
}
