import { createAction, props } from '@ngrx/store';
import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';

const getWorldChampions = createAction(
  'World Champions Get',
  props<{ startYear: number; endYear?: number }>()
);

const getWorldChampionsSuccess = createAction(
  'World Champions Get Success',
  props<{ standingsLists: IStandingModel[] }>()
);

const getWorldChampionsError = createAction(
  'World Champions Get Error',
  props<{ error: string }>()
);

export const WorldChampionsActions = {
  getWorldChampions,
  getWorldChampionsSuccess,
  getWorldChampionsError,
};
