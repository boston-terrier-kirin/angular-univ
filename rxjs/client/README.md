# Client

```ts
  merge() {
    const one$ = interval(1000);
    const two$ = one$.pipe(map((value) => value * 10));

    merge(one$, two$).subscribe((values) => {
      console.log(values);
    });
  }
```
