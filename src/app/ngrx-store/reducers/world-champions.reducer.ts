import { createReducer, on } from '@ngrx/store';
import { WorldChampionsActions } from '../actions/world-champions.actions';
import { WorldChampionsState } from '../state-models/world-champions-state.model';

const initialState: WorldChampionsState = {
  seasonsWorldChampion: undefined,
  error: null,
  isLoading: false,
};

export const worldChampionsReducer = createReducer(
  initialState,
  on(WorldChampionsActions.getWorldChampions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(WorldChampionsActions.getWorldChampionsSuccess, (state, payload) => ({
    ...state,
    seasonsWorldChampion: payload.standingsLists,
    isLoading: false,
  })),
  on(WorldChampionsActions.getWorldChampionsError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  }))
);
