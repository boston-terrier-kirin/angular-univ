import { Observable } from 'rxjs';

export function createHttpObservable<T>(url: string) {
  return new Observable<T>((subscriber) => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        subscriber.next(json);
        subscriber.complete();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
