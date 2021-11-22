import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Injectable()
export abstract class AsyncComponent implements OnDestroy {
  private _requests: number[] = [];
  protected _ngUnsubscribe = new Subject<void>();

  public get isLoading(): boolean {
    return this._getIsLoadingFunc();
  }
  public set isLoading(value: boolean) {
    this._setIsLoadingFunc(value);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  protected _apiRequest<T>(request: Observable<T>): Subject<T> {
    const bs = new Subject<T>();

    this._requests.push(1);

    request.pipe(take(1), takeUntil(this._ngUnsubscribe)).subscribe({
      next: (r) => {
        this._requests.pop();
        bs.next(r);
        bs.complete();
      },
      error: (err) => {
        this._requests.pop();
        bs.error(err);
        bs.complete();
      },
      complete: () => bs.complete(),
    });

    return bs;
  }

  private _getIsLoadingFunc() {
    if (this._requests.length > 0) {
      return true;
    }

    return false;
  }

  private _setIsLoadingFunc(value: boolean) {
    if (value === true) {
      this._requests.push(1);
      return;
    }

    this._requests.pop();
  }
}
