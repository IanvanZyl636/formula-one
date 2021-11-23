import { HttpClient } from '@angular/common/http';
import {
  IMRDataStandingsModel,
  IMRDataRaceModel,
} from './models/mr-data.model';

export class ErgastProvider {
  private _ergastRootApi = 'https://ergast.com/api/f1';

  constructor(private _http: HttpClient) {}

  protected _getDriverStandings = (limit: number, offset: number) =>
    this._http.get<{ MRData: IMRDataStandingsModel }>(
      `${this._ergastRootApi}/driverStandings/1.json?limit=${limit}&offset=${offset}`
    );

  protected _getSeasonResults = (year: number) =>
    this._http.get<{ MRData: IMRDataRaceModel }>(
      `${this._ergastRootApi}/${year}/results/1.json`
    );
}
