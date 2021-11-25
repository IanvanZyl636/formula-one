// import { state } from '@angular/animations';
// import { Injectable } from '@angular/core';
// import { ComponentStore } from '@ngrx/component-store';
// import { IStandingModel } from 'src/app/models/ergast/standing.model';

// //STATE
// export interface AsyncState {
//   isLoading: boolean;
// }

// //state definition
// export interface WorldChampionsState extends AsyncState {
//   seasonsWorldChampion: IStandingModel[] | undefined;
// }

// //ACTIONS
// const GET_SEASONSWORLDCHAMPION = 'Get Seasons World Champion';
// const GET_SEASONSWORLDCHAMPION_SUCCESS = 'Get Seasons World Champion success';

// const initialState: WorldChampionsState = {
//   seasonsWorldChampion: undefined,
//   isLoading: false,
// };

// @Injectable()
// export class WorldChampionsStore extends ComponentStore<WorldChampionsState> {
//   //selector
//   seasonsWorldChampion$ = this.select((state) => state.seasonsWorldChampion);
//   isLoading$ = this.select((state) => state.isLoading);

//   //effects
//   getSeasonsWorldChampion = this.effect();

//   constructor() {
//     super(initialState);
//   }
// }
