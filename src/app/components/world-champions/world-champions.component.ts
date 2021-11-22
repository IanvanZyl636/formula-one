import { Component, OnInit } from '@angular/core';
import { AsyncComponent } from 'src/app/base-components/async-component/async-component.class';
import { ErgastProvider } from 'src/app/integration/ergast/ergast.provider';
import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';

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

  constructor(private _ergastProvider: ErgastProvider) {
    super();
  }

  ngOnInit(): void {
    this._apiRequest(this._ergastProvider.getDriverStandings(2005)).subscribe({
      next: (response) => (this.seasonsWorldChampion = response),
      error: (error) => {
        console.error(error);
        this.seasonsWorldChampion = [];
      },
    });
  }
}
