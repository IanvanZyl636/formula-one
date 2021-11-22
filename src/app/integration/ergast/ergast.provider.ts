import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import {
  IMRDataStandingsModel,
  IMRDataRaceModel,
} from './models/mr-data.model';
import { IStandingModel } from './models/standing.model';

export const ergastRootApi = 'https://ergast.com/api/f1';

@Injectable({
  providedIn: 'root',
})
export class ErgastProvider {
  private _firstRecordedYear = 1950;

  constructor(private _http: HttpClient) {}

  public getDriverStandings(startYear: number, endYear: number = -1) {
    if (startYear < this._firstRecordedYear) {
      startYear = this._firstRecordedYear;
    }

    if (endYear === -1) {
      endYear = new Date().getFullYear();
    }

    if (endYear < this._firstRecordedYear) {
      endYear = this._firstRecordedYear;
    }

    if (startYear > endYear) {
      const tempYear = startYear;
      startYear = endYear;
      endYear = tempYear;
    }

    const limit = endYear - startYear + 1;
    const offset = startYear - this._firstRecordedYear;

    const apiCall = this._http
      .get<{ MRData: IMRDataStandingsModel }>(
        `${ergastRootApi}/driverStandings/1.json?limit=${limit}&offset=${offset}`
      )
      .pipe(map((resp) => resp.MRData.StandingsTable.StandingsLists));

    return apiCall;
  }

  public getSeasonResults = (year: number) =>
    this._http.get<{ MRData: IMRDataRaceModel }>(
      `${ergastRootApi}/${year}/results/1.json`
    );
}
