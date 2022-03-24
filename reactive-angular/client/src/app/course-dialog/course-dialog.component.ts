import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { Course } from '../model/course';
import { CoursesService } from '../services/Courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  // CourseDialogComponentは、MatDialogから呼び出しているので、app.componentでprovider登録しているLoadingServiceが見えない。
  // app.component.htmlに定義したloadingともつながっていない。
  providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    const saveCourse$ = this.coursesService
      .saveCourse(this.course.id, changes)
      .pipe(
        catchError((err) => {
          const message = 'Could not save course.';
          this.messagesService.showErrors(message);

          // throwErrorで元のobservableを置き換える。
          return throwError(() => new Error(err));
        })
      );

    this.loadingService
      .showLoaderUntilComplete(saveCourse$)
      .subscribe((course) => {
        // ダイアログをClOSEボタンで閉じたのかSAVEボタンで閉じたのか区別がつくようにするために、
        // closeにcourseを渡す。
        this.dialogRef.close(course);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
