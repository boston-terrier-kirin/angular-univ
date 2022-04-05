import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-course-step-one',
  templateUrl: './create-course-step-one.component.html',
  styleUrls: ['./create-course-step-one.component.css'],
})
export class CreateCourseStepOneComponent implements OnInit {
  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
    ],
    releasedAt: [moment(), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get courseTitle() {
    return this.form.controls['title'];
  }
}
