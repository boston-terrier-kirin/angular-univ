import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    releasedAt: [new Date(), Validators.required],
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
