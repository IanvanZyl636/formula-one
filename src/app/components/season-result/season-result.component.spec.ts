import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageModule } from '../page/page.module';
import { SeasonResultComponent } from './season-result.component';
import { delay, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IMRDataRaceModel } from 'src/app/integration/ergast/models/mr-data.model';
import { IRaceModel } from 'src/app/integration/ergast/models/race.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { StoreService } from 'src/app/integration/store.service';

// IMPORT Mock json data for testing
import * as seasonResults from 'src/mocks/edgast/season-results.json';

describe('SeasonResultComponent', () => {
  let component: SeasonResultComponent;
  let fixture: ComponentFixture<SeasonResultComponent>;
  let storeService: StoreService;
  let route: ActivatedRoute;

  const noListItemsMsgFunc = () =>
    fixture.debugElement.query(By.css('.no-list-items-text>span'));
  const raceTrElementsFunc = () =>
    fixture.debugElement.queryAll(By.css('#races-table>tbody>tr'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonResultComponent],
      imports: [HttpClientTestingModule, PageModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonResultComponent);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    component = fixture.componentInstance;
    storeService = fixture.debugElement.injector.get(StoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.pageTitle).toEqual('');
    expect(component.driverId).toBeUndefined();
    expect(component.races).toEqual([]);
    expect(component.centerContent).toBeFalse();
  });

  it(`should display list of appWorldChampionCardComponents, don't display "No result found message"`, fakeAsync(() => {
    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ year: '2005' })
    );

    const expectedData = seasonResults;

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(
      () => {
        return of(expectedData).pipe(delay(100));
      }
    );

    expect(component.races).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(
      storeService.ergastStore['_getSeasonResults']
    ).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(storeService.ergastStore['_getSeasonResults']).toHaveBeenCalled();
    expect(component.isLoading).toBeTrue();
    expect(component.races).toEqual([]);
    expect(noListItemsMsgFunc()).toBeFalsy();

    tick(100);

    expect(component.isLoading).toBeFalse();
    expect(component.races).toEqual(expectedData.MRData.RaceTable.Races);

    fixture.detectChanges();

    expect(component.races.length).toEqual(raceTrElementsFunc().length);
    expect(noListItemsMsgFunc()).toBeFalsy();
  }));

  it('should "No result found message" if the list is blank', fakeAsync(() => {
    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ year: '2005' })
    );

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(
      () => {
        return of({ MRData: { RaceTable: { Races: [] as IRaceModel[] } } } as {
          MRData: IMRDataRaceModel;
        }).pipe(delay(100));
      }
    );

    expect(component.races).toEqual([]);
    expect(component.isLoading).toBeFalse();

    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
    expect(raceTrElementsFunc().length).toEqual(0);
    expect(component.races).toEqual([]);

    tick(100);

    expect(component.isLoading).toBeFalse();
    expect(component.races).toEqual([]);

    fixture.detectChanges();

    expect(noListItemsMsgFunc()).toBeTruthy();
    expect(noListItemsMsgFunc().nativeElement.textContent).toEqual(
      'No result found'
    );
    expect(raceTrElementsFunc().length).toEqual(0);
  }));

  it('should have h1 equal to pageTitle', () => {
    fixture.detectChanges();

    let h1El = fixture.debugElement.query(By.css('h1'));

    expect(h1El).toBeTruthy();
    expect(h1El.nativeElement.textContent).toEqual(component.pageTitle);
  });

  it('should highlight driverId rows', () => {
    const seasonResultsData = seasonResults;
    const races = seasonResultsData.MRData.RaceTable.Races;
    const driverId = 'alonso';

    const expectedData = races.filter(
      (race) => race.Results[0].Driver.driverId === 'driverId'
    );

    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ year: '2005', driverId: driverId })
    );

    component.driverId = driverId;

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(
      () => {
        return of(seasonResultsData).pipe(delay(100));
      }
    );

    fixture.detectChanges();

    let hightLightedRows = fixture.debugElement.queryAll(
      By.css('driver-id-hightlight')
    );

    expect(hightLightedRows.length).toEqual(expectedData.length);
  });

  it('should not call getSeasonResults if year is null', () => {
    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ test: '' })
    );

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(
      () => {
        return of().pipe(delay(100));
      }
    );

    fixture.detectChanges();

    expect(
      storeService.ergastStore['_getSeasonResults']
    ).not.toHaveBeenCalled();
  });

  it('should call getSeasonResults if driverId is null', () => {
    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ year: '2005' })
    );

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(
      () => {
        return of().pipe(delay(100));
      }
    );

    fixture.detectChanges();

    expect(storeService.ergastStore['_getSeasonResults']).toHaveBeenCalled();
    expect(component.driverId).toBeNull();
  });

  it('toggle center content', () => {
    component.races = [];
    expect(component.centerContent).toBeFalse();

    component.races = [{} as IRaceModel];
    expect(component.centerContent).toBeTrue();
  });

  it('should console log error', fakeAsync(() => {
    spyOn(console, 'error');
    spyOnProperty(route.snapshot, 'paramMap', 'get').and.returnValue(
      convertToParamMap({ year: '2005' })
    );

    const expectedError = 'Test Error';

    spyOn<any>(storeService.ergastStore, '_getSeasonResults').and.callFake(() =>
      throwError(() => expectedError)
    );

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(expectedError);
  }));
});
