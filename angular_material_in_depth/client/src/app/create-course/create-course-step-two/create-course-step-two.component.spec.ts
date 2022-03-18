import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseStepTwoComponent } from './create-course-step-two.component';

describe('CreateCourseStepTwoComponent', () => {
  let component: CreateCourseStepTwoComponent;
  let fixture: ComponentFixture<CreateCourseStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseStepTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
