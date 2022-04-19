import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { CoursesResolver } from './services/courses.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
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
