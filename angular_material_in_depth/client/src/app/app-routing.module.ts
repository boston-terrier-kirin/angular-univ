import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './services/course.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-new-course',
    component: CreateCourseComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
