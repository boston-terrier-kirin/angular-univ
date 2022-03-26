import { Observable } from 'rxjs';

export function createHttpObservable<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          // fetchを使っている場合、catchに入るエラーと入らないエラーがあるので、res.okを見て判断した方が良い。
          return subscriber.error(
            'Request failed with status code: ' + res.status
          );
        }
      })
      .then((json) => {
        subscriber.next(json);
        subscriber.complete();
      })
      .catch((err) => {
        // server側で500を投げてもcatchに入らなかった。
        console.log(err);
        subscriber.error(err);
      });

    return () => controller.abort();
  });
}
