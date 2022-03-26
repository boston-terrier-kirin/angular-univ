# rxjs

## CourseComponent

```ts
  ngAfterViewInit() {
    // 検索初期値
    const initialLessons$ = this.loadLessons();

    // インクリメンタルサーチ
    const searchLessons$ = fromEvent<InputEvent>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event: Event) => {
        return (event.target as HTMLInputElement).value;
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => {
        // switchMapは後勝ち。検索がかぶったら、キャンセルして新しいリクエストを出す。
        return this.loadLessons(search);
      })
    );

    // 2つの結果をconcat
    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res: any) => res['payload']));
  }
```

## CourseDialogComponent

```ts
  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => {
          // formが正しいことでfilter
          return this.form.valid;
        }),
        concatMap((changes) => {
          // concatMapを使っているので、順番に前回のリクエストが終わるのを待ってfetchする
          return this.saveCourse(changes);
        })
      )
      .subscribe();
  }
```
