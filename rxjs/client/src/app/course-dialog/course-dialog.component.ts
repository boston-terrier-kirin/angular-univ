import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { from } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: Course;
  @ViewChild('saveButton', { static: true }) saveButton!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    // Section2-16
    // ここでやろうとしているのは、Pre-Save/Auto-Saveのようなこと。
    this.form.valueChanges
      .pipe(
        filter(() => {
          // formが正しいことでfilter
          return this.form.valid;
        }),
        concatMap((changes) => {
          // concatMapを使っているので、順番に前回のリクエストが終わるのを待ってfetchする
          return this.saveCourse(changes);
        })
      )
      .subscribe();
  }

  saveCourse(changes: any) {
    return from(
      fetch(`/api/courses/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json',
        },
      })
    );
  }

  ngAfterViewInit() {}

  close() {
    this.dialogRef.close();
  }
}
