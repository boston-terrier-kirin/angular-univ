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
import { ajax } from 'rxjs/ajax';
import { filter, concatMap, mergeMap, switchMap } from 'rxjs/operators';

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
        // switchMap((changes) => {
        //   // switchMapを使うと後勝ちになって、1回目がキャンセルされて2回目が実行される。
        //   return ajax.getJSON('/api/courses/1');
        // })
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