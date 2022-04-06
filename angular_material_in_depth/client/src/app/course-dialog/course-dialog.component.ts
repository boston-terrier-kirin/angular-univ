import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Course } from '../model/course';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit {
  description = '';
  form = this.fb.group({
    description: [this.course.description, Validators.required],
    category: [this.course.category, Validators.required],
    releasedAt: [new Date(), Validators.required],
    longDescription: [this.course.longDescription, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private course: Course,
    private dialogRef: MatDialogRef<CourseDialogComponent>
  ) {
    this.description = this.course.description;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}

export function openEditCourseDialog(dialog: MatDialog, course: Course) {
  const config = new MatDialogConfig();
  // config.disableClose = falseでオーバーレイをクリックすると閉じるようにできる。
  config.disableClose = false;
  config.autoFocus = true;
  // modal-panel はstyle.cssに定義しないとdialogに反映されない。
  config.panelClass = 'modal-panel';
  config.data = { ...course };

  // config.backdropClass = ""

  const dialogRef = dialog.open(CourseDialogComponent, config);
  return dialogRef.afterClosed();
}
