import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { HomeComponent } from './home/home.component';
import { LoginReactiveComponent } from './login-reactive/login-reactive.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginReactiveComponent,
  },
  {
    path: 'add-new-course',
    component: CreateCourseComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
