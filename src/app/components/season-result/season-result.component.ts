import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IRaceModel } from 'src/app/integration/ergast/models/race.model';
import { SeasonActions } from 'src/app/ngrx-store/actions/season.actions';
import { SeasonState } from 'src/app/ngrx-store/state-models/season.model copy';

@Component({
  selector: 'app-season-result',
  templateUrl: './season-result.component.html',
  styleUrls: ['./season-result.component.scss'],
})
export class SeasonResultComponent implements OnInit {
  public pageTitle = '';
  public driverId?: string | null;
  public races$ = this._store.select((state) => state.seasonState.races);
  public isLoading$ = this._store.select(
    (state) => state.seasonState.isLoading
  );

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<{ seasonState: SeasonState }>
  ) {}

  ngOnInit(): void {
    const yearParam = this._route.snapshot.paramMap.get('year');
    const driverIdParam = this._route.snapshot.paramMap.get('driverId');

    if (yearParam == null) {
      return;
    }

    const year = Number(yearParam);
    this.driverId = driverIdParam != null ? String(driverIdParam) : null;

    this.pageTitle = `Season ${year} Result`;

    this._store.dispatch(SeasonActions.getSeason({ year: year }));
  }

  centerContent = (races?: IRaceModel[] | null) =>
    races != null && races.length > 0;
}
