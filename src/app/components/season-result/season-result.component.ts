import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AsyncComponent } from 'src/app/base-components/async-component/async-component.base';
import { IRaceModel } from 'src/app/store/ergast/models/race.model';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-season-result',
  templateUrl: './season-result.component.html',
  styleUrls: ['./season-result.component.scss'],
})
export class SeasonResultComponent extends AsyncComponent implements OnInit {
  public pageTitle = '';
  public driverId?: string | null;
  public races: IRaceModel[] = [];

  public get centerContent() {
    return this.races.length > 0;
  }

  constructor(
    private _route: ActivatedRoute,
    private _storeService: StoreService
  ) {
    super();
  }

  ngOnInit(): void {
    const yearParam = this._route.snapshot.paramMap.get('year');
    const driverIdParam = this._route.snapshot.paramMap.get('driverId');

    if (yearParam == null) {
      return;
    }

    const year = Number(yearParam);
    this.driverId = driverIdParam != null ? String(driverIdParam) : null;

    this.pageTitle = `Season ${year} Result`;

    this._storeService.ergastStore.getSeasonResults(year);

    this._apiRequest(
      this._storeService.ergastStore.seasonResults.pipe(
        filter((x) => x !== undefined)
      )
    ).subscribe({
      next: (response) => (this.races = response as IRaceModel[]),
      error: (error) => {
        console.error(error);
        this.races = [];
      },
    });
  }
}
