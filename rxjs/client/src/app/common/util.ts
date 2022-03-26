import { Observable } from 'rxjs';

export function createHttpObservable<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
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

    return () => controller.abort();
  });
}
