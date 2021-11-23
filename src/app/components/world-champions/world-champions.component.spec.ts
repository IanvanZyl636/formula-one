import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { delay, map, of, throwError } from 'rxjs';
import { PageModule } from '../page/page.module';
import { WorldChampionCardModule } from '../world-champion-card/world-champion-card.module';
import { WorldChampionsComponent } from './world-champions.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from 'src/app/integration/store.service';

// IMPORT Mock json data for testing
import * as driverStandingsJson from 'src/mocks/edgast/driver-standings.json';
import {
  IMRDataRaceModel,
  IMRDataStandingsModel,
} from 'src/app/integration/ergast/models/mr-data.model';
import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';

describe('WorldChampionsComponent', () => {
  let component: WorldChampionsComponent;
  let fixture: ComponentFixture<WorldChampionsComponent>;
  let storeService: StoreService;

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
    storeService = fixture.debugElement.injector.get(StoreService);
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

    spyOn<any>(storeService.ergastStore, '_getDriverStandings').and.callFake(
      () => {
        return of(expectedData).pipe(delay(100));
      }
    );

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
    spyOn<any>(storeService.ergastStore, '_getDriverStandings').and.callFake(
      () => {
        return of({
          MRData: {
            StandingsTable: { StandingsLists: [] as IStandingModel[] },
          },
        } as {
          MRData: IMRDataStandingsModel;
        }).pipe(delay(100));
      }
    );

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

    spyOn<any>(storeService.ergastStore, '_getDriverStandings').and.callFake(
      () => throwError(() => expectedError)
    );

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(expectedError);
  }));
});
