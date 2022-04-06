import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses?: Course[] | null = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(
        filter((value) => {
          // Closeボタンをクリックした場合はformの値が戻ってこない。
          return !!value;
        })
      )
      .subscribe((value) => {
        console.log(value);
      });
  }
}
