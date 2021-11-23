import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AsyncComponent } from 'src/app/base-components/async-component/async-component.base';
import { IStandingModel } from 'src/app/store/ergast/models/standing.model';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-world-champions',
  templateUrl: './world-champions.component.html',
  styleUrls: ['./world-champions.component.scss'],
})
export class WorldChampionsComponent extends AsyncComponent implements OnInit {
  public readonly pageTitle = 'Season World Champions';
  public seasonsWorldChampion: IStandingModel[] = [];

  public get centerContent() {
    return this.seasonsWorldChampion.length > 0;
  }

  constructor(private _storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this._storeService.ergastStore.getDriverStandingsByYear(2005);

    this._apiRequest(
      this._storeService.ergastStore.driverStandings.pipe(
        filter((x) => x !== undefined)
      )
    ).subscribe({
      next: (response) =>
        (this.seasonsWorldChampion = response as IStandingModel[]),
      error: (error) => {
        console.error(error);
        this.seasonsWorldChampion = [];
      },
    });
  }
}
