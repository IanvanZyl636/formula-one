import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreService } from '../store.service';

// IMPORT Mock json data for testing
import * as driverStandingsJson from 'src/mocks/edgast/driver-standings.json';
import * as seasonResults from 'src/mocks/edgast/season-results.json';

describe('ErgastStore', () => {
  let store: StoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(StoreService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(store).toBeTruthy();
    expect(store).toBeDefined();
  });

  it('can test ErgastProvider.getDriverStandings expected paths', () => {
    const testCases: {
      startYear: number;
      endYear?: number;
      expectedPath: string;
    }[] = [
      {
        startYear: 2005,
        expectedPath: `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=17&offset=55`,
      },
      {
        startYear: 1949,
        expectedPath: `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=72&offset=0`,
      },
      {
        startYear: 1980,
        endYear: 1975,
        expectedPath: `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=6&offset=25`,
      },
      {
        startYear: 1949,
        endYear: 1949,
        expectedPath: `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=1&offset=0`,
      },
    ];

    let driverStandingsPathLogic = (testCase: {
      startYear: number;
      endYear?: number;
      expectedPath: string;
    }) => {
      store.ergastStore.getDriverStandingsByYear(
        testCase.startYear,
        testCase.endYear
      );

      const req = httpTestingController.expectOne(testCase.expectedPath);

      expect(req.request.method).toEqual('GET');
    };

    testCases.forEach((testCase) => {
      driverStandingsPathLogic(testCase);
    });
  });

  it('can test ErgastProvider.getDriverStandings', () => {
    let mockData = driverStandingsJson;

    store.ergastStore.getDriverStandingsByYear(2005);

    const req = httpTestingController.expectOne(
      `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=17&offset=55`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);

    store.ergastStore.driverStandings.subscribe((data) =>
      expect(data).toEqual(mockData.MRData.StandingsTable.StandingsLists)
    );
  });

  it('can test ErgastProvider.getDriverStandings for 404 error', () => {
    const emsg = 'deliberate 404 error';

    store.ergastStore.getDriverStandingsByYear(2005);

    store.ergastStore.driverStandings.subscribe({
      next: (data) => expect(data).toBeUndefined(),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('404 status').toEqual(404);
        expect(error.error).withContext('Error message').toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(
      `${store.ergastStore['_ergastRootApi']}/driverStandings/1.json?limit=17&offset=55`
    );

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test ErgastProvider.getSeasonResults', () => {
    let mockData = seasonResults;

    store.ergastStore.getSeasonResults(2005);

    const req = httpTestingController.expectOne(
      `${store.ergastStore['_ergastRootApi']}/2005/results/1.json`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);

    store.ergastStore.seasonResults.subscribe((data) =>
      expect(data).toEqual(mockData.MRData.RaceTable.Races)
    );
  });

  it('can test ErgastProvider.getSeasonResults for 404 error', () => {
    const emsg = 'deliberate 404 error';

    store.ergastStore.getSeasonResults(2005);

    store.ergastStore.seasonResults.subscribe({
      next: (data) => expect(data).toBeUndefined(),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('404 status').toEqual(404);
        expect(error.error).withContext('Error message').toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(
      `${store.ergastStore['_ergastRootApi']}/2005/results/1.json`
    );

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
