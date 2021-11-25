import { createReducer, on } from '@ngrx/store';
import { SeasonActions } from '../actions/season.actions';
import { SeasonState } from '../state-models/season.model copy';

const initialState: SeasonState = {
  races: undefined,
  error: null,
  isLoading: false,
};

export const seasonReducer = createReducer(
  initialState,
  on(SeasonActions.getSeason, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(SeasonActions.getSeasonSuccess, (state, payload) => ({
    ...state,
    races: payload.races,
    isLoading: false,
  })),
  on(SeasonActions.getSeasonError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  }))
);
