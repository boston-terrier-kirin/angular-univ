import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[] | null = [];
  @Output() coursesChange = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        filter((value) => {
          // ダイアログをCLOSEボタンで閉じた場合、undefinedが返ってくるので、!!valueでフィルタして、emitされないようにする。
          console.log('CoursesCardListComponent.afterClosed -> filter', value);
          return !!value;
        }),
        tap((value) => {
          // ダイアログをCLOSEボタンで閉じた場合はここまで来ないので、emitされない。
          console.log('CoursesCardListComponent.afterClosed -> tap', value);
          this.coursesChange.emit();
        })
      )
      .subscribe();
  }
}
