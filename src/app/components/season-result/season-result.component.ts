import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AsyncComponent } from 'src/app/base-components/async-component/async-component.class';
import { ErgastProvider } from 'src/app/integration/ergast/ergast.provider';
import { IRaceModel } from 'src/app/integration/ergast/models/race.model';

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
    private _ergastProvider: ErgastProvider
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

    this._apiRequest(this._ergastProvider.getSeasonResults(year))
      .pipe(map((resp) => resp.MRData.RaceTable.Races))
      .subscribe({
        next: (response) => (this.races = response),
        error: (error) => {
          console.error(error);
          this.races = [];
        },
      });
  }
}
