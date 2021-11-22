import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErgastProvider, ergastRootApi } from './ergast.provider';

// IMPORT Mock json data for testing
import * as driverStandingsJson from 'src/mocks/edgast/driver-standings.json';
import * as seasonResults from 'src/mocks/edgast/season-results.json';

describe('ErgastProvider', () => {
  let provider: ErgastProvider;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    provider = TestBed.inject(ErgastProvider);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  it('can test ErgastProvider.getDriverStandings expected paths', () => {
    const testCases: {
      startYear: number;
      endYear?: number;
      expectedPath: string;
    }[] = [
      {
        startYear: 2005,
        expectedPath: `${ergastRootApi}/driverStandings/1.json?limit=17&offset=55`,
      },
      {
        startYear: 1949,
        expectedPath: `${ergastRootApi}/driverStandings/1.json?limit=72&offset=0`,
      },
      {
        startYear: 1980,
        endYear: 1975,
        expectedPath: `${ergastRootApi}/driverStandings/1.json?limit=6&offset=25`,
      },
      {
        startYear: 1949,
        endYear: 1949,
        expectedPath: `${ergastRootApi}/driverStandings/1.json?limit=1&offset=0`,
      },
    ];

    let driverStandingsPathLogic = (testCase: {
      startYear: number;
      endYear?: number;
      expectedPath: string;
    }) => {
      provider
        .getDriverStandings(testCase.startYear, testCase.endYear)
        .subscribe();

      const req = httpTestingController.expectOne(testCase.expectedPath);

      expect(req.request.method).toEqual('GET');
    };

    testCases.forEach((testCase) => {
      driverStandingsPathLogic(testCase);
    });
  });

  it('can test ErgastProvider.getDriverStandings', () => {
    let mockData = driverStandingsJson;

    provider
      .getDriverStandings(2005)
      .subscribe((data) =>
        expect(data).toEqual(mockData.MRData.StandingsTable.StandingsLists)
      );

    const req = httpTestingController.expectOne(
      `${ergastRootApi}/driverStandings/1.json?limit=17&offset=55`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('can test ErgastProvider.getDriverStandings for 404 error', () => {
    const emsg = 'deliberate 404 error';

    provider.getDriverStandings(2005).subscribe({
      next: (data) => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('404 status').toEqual(404);
        expect(error.error).withContext('Error message').toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(
      `${ergastRootApi}/driverStandings/1.json?limit=17&offset=55`
    );

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test ErgastProvider.getSeasonResults', () => {
    let mockData = seasonResults;

    provider
      .getSeasonResults(2005)
      .subscribe((data) => expect(data).toEqual(mockData as any));

    const req = httpTestingController.expectOne(
      `${ergastRootApi}/2005/results/1.json`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('can test ErgastProvider.getSeasonResults for 404 error', () => {
    const emsg = 'deliberate 404 error';

    provider.getSeasonResults(2005).subscribe({
      next: (data) => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('404 status').toEqual(404);
        expect(error.error).withContext('Error message').toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(
      `${ergastRootApi}/2005/results/1.json`
    );

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
