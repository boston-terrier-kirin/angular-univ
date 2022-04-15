import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.css'],
})
export class CreateCourseStep1Component implements OnInit {
  controls = this.createControls();
  form = new FormGroup(this.controls);

  ngOnInit() {}

  createControls() {
    const title = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ],
    });
    return {
      title,
    };
  }
}
