import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { CoursesResolver } from './services/courses.resolver';

const routes: Routes = [
  {
    // http://localhost:4200/courses
    path: '',
    component: HomeComponent,
  },
  {
    // http://localhost:4200/courses/angular-router-course
    path: ':courseUrl',
    component: CourseComponent,
    children: [
      // CourseComponentにrouter-outletがあって、CourseComponentは常に表示した状態で、
      // router-outletで(a)と(b)が切り替わる。
      {
        // (a) http://localhost:4200/courses/angular-router-course
        path: '',
        component: LessonsListComponent,
      },
      {
        // (b) http://localhost:4200/courses/angular-router-course/lessons/1
        path: 'lessons/:lessonSeqNo',
        component: LessonDetailComponent,
      },
    ],
    resolve: {
      // ここのcourseは、CourseComponentでthis.route.snapshot.data["course"];する時の、course。
      course: CoursesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CoursesResolver],
})
export class CoursesRoutingModule {}
