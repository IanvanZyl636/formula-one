import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  const contentElFunc = () => fixture.debugElement.query(By.css('#content'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.heading).toEqual('');
    expect(component.isLoading).toBeFalse();
    expect(component.centerContent).toBeFalse();
  });

  it('should bind heading to h1', () => {
    const h1ElFunc = () => fixture.debugElement.query(By.css('h1'));

    expect(h1ElFunc()).toBeTruthy();
    expect(h1ElFunc().nativeElement.textContent).toEqual('');

    const expectedHeading = 'TestHeading';

    component.heading = expectedHeading;

    fixture.detectChanges();

    expect(h1ElFunc()).toBeTruthy();
    expect(h1ElFunc().nativeElement.textContent).toEqual(expectedHeading);
  });

  it('should hide content and show loading spinner if isLoading', () => {
    const pageLoadingElFunc = () =>
      fixture.debugElement.query(By.css('.page-loading'));

    expect(contentElFunc()).toBeTruthy();
    expect(pageLoadingElFunc()).toBeFalsy();

    component.isLoading = true;

    fixture.detectChanges();

    expect(contentElFunc()).toBeFalsy();
    expect(pageLoadingElFunc()).toBeTruthy();
  });

  it('should toggle content center with centerContent', () => {
    expect(contentElFunc()).toBeTruthy();
    expect(contentElFunc().nativeElement.getAttribute('class')).not.toContain(
      'justify-content-center align-items-center'
    );

    component.centerContent = true;

    fixture.detectChanges();

    expect(contentElFunc().nativeElement.getAttribute('class')).toContain(
      'justify-content-center align-items-center'
    );
  });
});
