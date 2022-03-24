import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CoursesService } from '../services/Courses.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  // CourseDialogComponentは、MatDialogから呼び出しているので、app.componentでprovider登録しているLoadingServiceが見えない。
  // app.component.htmlに定義したloadingともつながっていない。
  providers: [LoadingService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService,
    private loadingService: LoadingService
  ) {
    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });

    // app.component.htmlに定義したloadingとつながっていないので、app.component.htmlのloadingは呼び出せない。
    this.loadingService.loadingOn();
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    this.coursesService
      .saveCourse(this.course.id, changes)
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
