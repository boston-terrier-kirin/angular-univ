import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

  cols = 3;
  rowHeight = '500px';
  handSetPortrait = false;

  constructor(
    private dialog: MatDialog,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .subscribe((result) => {
        console.log(result);
        const breakPoints = result.breakpoints;

        this.cols = 3;
        this.rowHeight = '500px';
        this.handSetPortrait = false;

        if (breakPoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakPoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
          this.rowHeight = '430px';
        } else if (breakPoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.handSetPortrait = true;
        } else if (breakPoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
          this.rowHeight = '430px';
        }
      });
  }

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
