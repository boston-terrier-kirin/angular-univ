import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './services/course.resolver';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { VirtualScrollingComponent } from './virtual-scrolling/virtual-scrolling.component';

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
  {
    path: 'drag-drop-example',
    component: DragDropComponent,
  },
  {
    path: 'tree-demo',
    component: TreeDemoComponent,
  },
  {
    path: 'virtual-scrolling',
    component: VirtualScrollingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
