import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AsyncComponent } from './async-component.base';

@Component({})
class TestComponent extends AsyncComponent {}

describe('AsyncComponent', () => {
  let component: TestComponent;

  beforeEach(() => {
    component = new TestComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('_apiRequest should toggle isLoading', () => {
    const s1 = new Subject<string>();
    const s2 = new Subject<string>();

    const expectedS1 = 'test1';
    const expectedS2 = 'test2';

    expect(component.isLoading).toBeFalse();
    const sub1 = component['_apiRequest'](s1).subscribe((resp) =>
      expect(resp).toEqual(expectedS1)
    );

    expect(component.isLoading).toBeTrue();
    const sub2 = component['_apiRequest'](s2).subscribe((resp) =>
      expect(resp).toEqual(expectedS2)
    );

    expect(sub1.closed).toBeFalse();

    s1.next('test1');

    expect(sub1.closed).toBeTrue();
    expect(component.isLoading).toBeTrue();
    expect(sub2.closed).toBeFalse();

    s2.next('test2');

    expect(sub2.closed).toBeTrue();
    expect(component.isLoading).toBeFalse();
  });

  it('ngOnDestroy should unsubscribe any subscribtions from requests', () => {
    const s = new Subject<void>();

    const sub = component['_apiRequest'](s).subscribe();

    expect(sub.closed).toBeFalse();

    component.ngOnDestroy();

    expect(sub.closed).toBeTrue();
  });

  it('should isLoading = true when set', () => {
    component.isLoading = true;
    expect(component.isLoading).toBeTrue();

    component.isLoading = true;
    expect(component.isLoading).toBeTrue();

    component.isLoading = false;
    expect(component.isLoading).toBeTrue();

    component.isLoading = false;
    expect(component.isLoading).toBeFalse();
  });

  it('_apiRequest should pass error along', () => {
    const s = new Subject<string>();
    const expectedError = 'TestError';

    component['_apiRequest'](s).subscribe({
      next: () => null,
      error: (err) => {
        expect(err).toEqual(expectedError);
      },
    });

    s.error(expectedError);
  });
});
