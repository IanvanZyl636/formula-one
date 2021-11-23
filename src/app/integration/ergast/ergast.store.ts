import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mixin } from 'ts-mixer';
import { StoreBase } from '../store.base';
import { ErgastProvider } from './ergast.provider';
import { IRaceModel } from './models/race.model';
import { IStandingModel } from './models/standing.model';

export class ErgastStore extends Mixin(StoreBase, ErgastProvider) {
  private _firstRecordedYear = 1950;

  private _driverStandings = new BehaviorSubject<IStandingModel[] | undefined>(
    undefined
  );
  private _seasonResults = new BehaviorSubject<IRaceModel[] | undefined>(
    undefined
  );

  public readonly driverStandings = this._driverStandings.asObservable();
  public readonly seasonResults = this._seasonResults.asObservable();

  constructor(_http: HttpClient) {
    super(_http);
  }

  public getDriverStandingsByYear(startYear: number, endYear: number = -1) {
    this._driverStandings.next(undefined);

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

    this._handleSubscribtion(
      this._getDriverStandings(limit, offset).pipe(
        filter((resp) => resp !== null),
        map((resp) => resp.MRData.StandingsTable.StandingsLists)
      ),
      this._driverStandings
    );
  }

  public getSeasonResults(year: number) {
    this._seasonResults.next(undefined);

    this._handleSubscribtion(
      this._getSeasonResults(year).pipe(
        filter((resp) => resp !== null),
        map((resp) => resp.MRData.RaceTable.Races)
      ),
      this._seasonResults
    );
  }
}
