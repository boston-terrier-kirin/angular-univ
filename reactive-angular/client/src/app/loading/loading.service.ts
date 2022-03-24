import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

// LoadingServiceは複数個所で使うかもしれないので、Singletonだと都合が悪い。
@Injectable()
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.subject.asObservable();

  showLoaderUntilComplete<T>(observable$: Observable<T>): Observable<T> {
    // ofで新しいobservableを作って
    return of(null).pipe(
      tap(() => {
        // loadingOn。ofしているのは、loadingOnをここに配置したいため。
        this.loadingOn();
      }),
      concatMap(() => {
        // ofで作ったobservableはすぐに終わるので、元のobservableをつなげる
        return observable$;
      }),
      finalize(() => {
        // loadingOff。
        this.loadingOff();
      })
    );
  }

  loadingOn() {
    this.subject.next(true);
  }

  loadingOff() {
    this.subject.next(false);
  }
}
