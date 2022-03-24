import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// メッセージを複数表示することもあるので、Singletonは都合が悪い。
@Injectable()
export class MessagesService {
  private subject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.subject.asObservable().pipe(
    // subjectの初期値は空の配列なので除外する。
    filter((messages) => messages && messages.length > 0)
  );

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
