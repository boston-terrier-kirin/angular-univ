import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const debug = (message: string) => {
  return (source: Observable<any>) => {
    return source.pipe(
      tap((value) => {
        console.log(message, value);
      })
    );
  };
};
