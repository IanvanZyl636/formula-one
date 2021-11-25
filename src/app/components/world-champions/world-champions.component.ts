import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';
import { WorldChampionsActions } from 'src/app/ngrx-store/actions/world-champions.actions';
import { WorldChampionsState } from 'src/app/ngrx-store/state-models/world-champions-state.model';

@Component({
  selector: 'app-world-champions',
  templateUrl: './world-champions.component.html',
  styleUrls: ['./world-champions.component.scss'],
})
export class WorldChampionsComponent implements OnInit {
  public readonly pageTitle = 'Season World Champions';

  public seasonsWorldChampion$ = this._store.select(
    (state) => state.worldChampionsState.seasonsWorldChampion
  );
  public isLoading$ = this._store.select(
    (state) => state.worldChampionsState.isLoading
  );

  constructor(
    private _store: Store<{ worldChampionsState: WorldChampionsState }>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      WorldChampionsActions.getWorldChampions({ startYear: 2005 })
    );
  }

  centerContent = (seasonsWorldChampion?: IStandingModel[] | null) =>
    seasonsWorldChampion != null && seasonsWorldChampion.length > 0;
}
