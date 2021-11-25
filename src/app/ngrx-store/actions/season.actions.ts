import { createAction, props } from '@ngrx/store';
import { IRaceModel } from 'src/app/integration/ergast/models/race.model';

const getSeason = createAction('Season Get', props<{ year: number }>());

const getSeasonSuccess = createAction(
  'Season Get Success',
  props<{ races: IRaceModel[] }>()
);

const getSeasonError = createAction(
  'Season Get Error',
  props<{ error: string }>()
);

export const SeasonActions = {
  getSeason,
  getSeasonSuccess,
  getSeasonError,
};
