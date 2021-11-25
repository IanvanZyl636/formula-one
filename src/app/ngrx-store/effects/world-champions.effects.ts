import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ErgastService } from 'src/app/integration/ergast/ergast.service';
import { WorldChampionsActions } from '../actions/world-champions.actions';

@Injectable()
export class WorldChampionsEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _ergastService: ErgastService
  ) {}

  getWorldChampions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(WorldChampionsActions.getWorldChampions),
      exhaustMap((payload) => {
        const { limit, offset } = this._getDriverStandingsLimitOffset(
          payload.startYear,
          payload.endYear
        );

        return this._ergastService.getDriverStandings(limit, offset).pipe(
          map((response) =>
            WorldChampionsActions.getWorldChampionsSuccess({
              standingsLists: response.MRData.StandingsTable.StandingsLists,
            })
          ),
          catchError((err: Error) =>
            of(
              WorldChampionsActions.getWorldChampionsError({
                error: err.message,
              })
            )
          )
        );
      })
    )
  );

  private _getDriverStandingsLimitOffset(
    startYear: number,
    endYear: number = -1
  ) {
    if (startYear < ErgastService.firstRecordedYear) {
      startYear = ErgastService.firstRecordedYear;
    }

    if (endYear === -1) {
      endYear = new Date().getFullYear();
    }

    if (endYear < ErgastService.firstRecordedYear) {
      endYear = ErgastService.firstRecordedYear;
    }

    if (startYear > endYear) {
      const tempYear = startYear;
      startYear = endYear;
      endYear = tempYear;
    }

    const limit = endYear - startYear + 1;
    const offset = startYear - ErgastService.firstRecordedYear;

    return { limit, offset };
  }
}
