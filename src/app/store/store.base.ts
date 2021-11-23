import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class StoreBase {
  protected _handleSubscribtion<T>(
    observable: Observable<T>,
    value: BehaviorSubject<T | undefined>
  ) {
    observable.subscribe({
      next: (resp) => value.next(resp),
      error: (error) => value.error(error),
    });
  }
}
