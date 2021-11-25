import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ErgastService } from 'src/app/integration/ergast/ergast.service';
import { SeasonActions } from '../actions/season.actions';

@Injectable()
export class SeasonEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _ergastService: ErgastService
  ) {}

  getSeason$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SeasonActions.getSeason),
      exhaustMap((payload) => {
        return this._ergastService.getSeasonResults(payload.year).pipe(
          map((response) =>
            SeasonActions.getSeasonSuccess({
              races: response.MRData.RaceTable.Races,
            })
          ),
          catchError((err: Error) =>
            of(SeasonActions.getSeasonError({ error: err.message }))
          )
        );
      })
    )
  );
}
