import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IMRDataRaceModel,
  IMRDataStandingsModel,
} from './models/mr-data.model';

@Injectable({
  providedIn: 'root',
})
export class ErgastService {
  public static readonly firstRecordedYear = 1950;
  private _ergastRootApi = 'https://ergast.com/api/f1';

  constructor(private _http: HttpClient) {}

  public getDriverStandings = (limit: number, offset: number) =>
    this._http.get<{ MRData: IMRDataStandingsModel }>(
      `${this._ergastRootApi}/driverStandings/1.json?limit=${limit}&offset=${offset}`
    );

  public getSeasonResults = (year: number) =>
    this._http.get<{ MRData: IMRDataRaceModel }>(
      `${this._ergastRootApi}/${year}/results/1.json`
    );
}
