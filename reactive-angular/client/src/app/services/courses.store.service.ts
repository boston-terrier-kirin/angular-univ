import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { Course, sortCoursesBySeqNo } from '../model/course';

type Category = 'BEGINNER' | 'ADVANCED';

interface CoursesResponse {
  [payload: string]: Course[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private loadingServie: LoadingService,
    private messagesServive: MessagesService
  ) {
    this.loadAllCourses();
  }

  loadAllCourses() {
    const loadCourses$ = this.httpClient
      .get<CoursesResponse>('/api/courses')
      .pipe(
        map((res) => res['payload']),
        catchError((err) => {
          this.messagesServive.showErrors('Could not load courses.');
          return throwError(() => new Error(err));
        }),
        tap((courses) => this.subject.next(courses))
      );

    this.loadingServie.showLoaderUntilComplete(loadCourses$).subscribe();
  }

  filterByCategory(category: Category): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === category)
      ),
      map((courses) => courses.sort(sortCoursesBySeqNo))
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    // BehaviorSubjectから今の値をGETする。
    const courses = this.subject.getValue();

    // 更新対象のCourseをGETする。
    const idx = courses.findIndex((course) => course.id === courseId);

    // 更新を反映する
    const newCourse: Course = {
      ...courses[idx],
      ...changes,
    };
    const newCourses: Course[] = [...courses];
    newCourses[idx] = newCourse;

    // subjectで新しい値をemitする。
    this.subject.next(newCourses);

    // 実際に更新する。
    return this.httpClient
      .put<Course>(`/api/courses/${courseId}`, changes)
      .pipe(
        catchError((err) => {
          // エラーになった場合、dialogは閉じて、homeにメッセージが表示される。
          this.messagesServive.showErrors('Could not save course.');
          return throwError(() => new Error(err));
        }),
        shareReplay()
      );
  }
}
