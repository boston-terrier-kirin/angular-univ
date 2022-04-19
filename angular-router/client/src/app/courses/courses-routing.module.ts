import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { CoursesResolver } from './services/courses.resolver';
import { LessonsResolver } from './services/lessons.resolver';

const routes: Routes = [
  {
    // http://localhost:4200/courses
    path: '',
    component: HomeComponent,
  },
  /**
   * HomeComponent⇒CourseComponentに遷移する場合、
   * CoursesResolverとLessonsResolverの両方が解決して初めて、画面遷移する。
   * ⇒CoursesResolverとLessonsResolverは順番に流れているのがデメリット。
   * reactive-angularでやったように、
   * CourseComponentで
   * ・coursesService.loadCourseByUrl
   * ・coursesService.loadAllCourseLessons
   * を同時に流して、combineLatestした方が良い気がする。
   */
  {
    // http://localhost:4200/courses/angular-router-course
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      // ここのcourseは、CourseComponentでthis.route.snapshot.data["course"];する時の、course。
      course: CoursesResolver,
    },
    children: [
      // CourseComponentにrouter-outletがあって、CourseComponentは常に表示した状態で、
      // router-outletで(a)と(b)が切り替わる。
      {
        // (a) http://localhost:4200/courses/angular-router-course
        path: '',
        component: LessonsListComponent,
        resolve: {
          lessons: LessonsResolver,
        },
      },
      {
        // (b) http://localhost:4200/courses/angular-router-course/lessons/1
        path: 'lessons/:lessonSeqNo',
        component: LessonDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CoursesResolver, LessonsResolver],
})
export class CoursesRoutingModule {}
