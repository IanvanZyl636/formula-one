import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { delay, map, of, throwError } from 'rxjs';
import { ErgastProvider } from 'src/app/integration/ergast/ergast.provider';
import { PageModule } from '../page/page.module';
import { WorldChampionCardModule } from '../world-champion-card/world-champion-card.module';
import { WorldChampionsComponent } from './world-champions.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// IMPORT Mock json data for testing
import * as driverStandingsJson from 'src/mocks/edgast/driver-standings.json';

describe('WorldChampionsComponent', () => {
  let component: WorldChampionsComponent;
  let fixture: ComponentFixture<WorldChampionsComponent>;
  let ergastProvider: ErgastProvider;

  const noListItemsMsgFunc = () =>
    fixture.debugElement.query(By.css('.no-list-items-text>span'));
  const appWorldChampionCardsFunc = () =>
    fixture.debugElement.queryAll(By.css('app-world-champion-card'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorldChampionsComponent],
      imports: [
        PageModule,
        WorldChampionCardModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldChampionsComponent);
    component = fixture.componentInstance;
    ergastProvider = fixture.debugElement.injector.get(ErgastProvider);
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();

    // Check default values when component is created
    expect(component.centerContent).toBeFalse();
    expect(component.isLoading).toBeFalse();
    expect(component.pageTitle).toEqual('Season World Champions');
    expect(component.seasonsWorldChampion).toEqual([]);
  });

  it(`should display list of appWorldChampionCardComponents, don't display "No result found message" and center content`, fakeAsync(() => {
    const expectedData = driverStandingsJson;

    spyOn(ergastProvider, 'getDriverStandings').and.callFake(() => {
      return of(expectedData).pipe(
        map((resp) => resp.MRData.StandingsTable.StandingsLists),
        delay(100)
      );
    });

    expect(component.seasonsWorldChampion).toEqual([]);
    expect(component.isLoading).toBeFalse();

    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
    expect(component.seasonsWorldChampion).toEqual([]);
    expect(component.centerContent).toBeFalse();
    expect(noListItemsMsgFunc()).toBeFalsy();

    tick(100);

    expect(component.isLoading).toBeFalse();
    expect(component.seasonsWorldChampion).toEqual(
      expectedData.MRData.StandingsTable.StandingsLists
    );
    expect(component.centerContent).toBeTrue();

    fixture.detectChanges();

    expect(component.seasonsWorldChampion.length).toEqual(
      appWorldChampionCardsFunc().length
    );
    expect(noListItemsMsgFunc()).toBeFalsy();
  }));

  it('should "No result found message" if the list is blank and not center content', fakeAsync(() => {
    spyOn(ergastProvider, 'getDriverStandings').and.callFake(() => {
      return of([]).pipe(delay(100));
    });

    expect(component.seasonsWorldChampion).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(component.centerContent).toBeFalse();

    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
    expect(appWorldChampionCardsFunc().length).toEqual(0);
    expect(component.seasonsWorldChampion).toEqual([]);

    tick(100);

    expect(component.isLoading).toBeFalse();
    expect(component.seasonsWorldChampion).toEqual([]);

    fixture.detectChanges();

    expect(noListItemsMsgFunc()).toBeTruthy();
    expect(noListItemsMsgFunc().nativeElement.textContent).toEqual(
      'No result found'
    );
    expect(appWorldChampionCardsFunc().length).toEqual(0);
    expect(component.centerContent).toBeFalse();
  }));

  it('should have h1 equal to pageTitle', () => {
    fixture.detectChanges();

    let h1El = fixture.debugElement.query(By.css('h1'));

    expect(h1El).toBeTruthy();
    expect(h1El.nativeElement.textContent).toEqual(component.pageTitle);
  });

  it('should console log error', fakeAsync(() => {
    spyOn(console, 'error');

    const expectedError = 'Test Error';

    spyOn(ergastProvider, 'getDriverStandings').and.callFake(() =>
      throwError(() => expectedError)
    );

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(expectedError);
  }));
});
