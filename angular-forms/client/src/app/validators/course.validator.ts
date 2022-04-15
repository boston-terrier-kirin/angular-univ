import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, debounceTime, shareReplay } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';

export function courseValidator(
  coursesService: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return coursesService.findAllCourses().pipe(
      // ここでdebounceをやっても意味がない。
      // キー入力をdebounceするのであれば意味があるが、ここでdebounceしてもサーバレスポンスがたくさん返ってくるのをdebounceすることになるので。
      // debounceTime(4000),
      // shareReplay(),
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLowerCase() === control.value.toLowerCase()
        );

        return course ? { titleExists: true } : null;
      })
    );
  };
}
