import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDriverStandingModel } from 'src/app/store/ergast/models/driver-standing.model';
import { IStandingModel } from 'src/app/store/ergast/models/standing.model';

@Component({
  selector: 'app-world-champion-card',
  templateUrl: './world-champion-card.component.html',
  styleUrls: ['./world-champion-card.component.scss'],
})
export class WorldChampionCardComponent implements OnChanges {
  @Input() public seasonWorldChampion?: IStandingModel;
  public driverStanding?: IDriverStandingModel;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'seasonWorldChampion') {
        this.driverStanding = this._setDriverStanding();
      }
    }
  }

  private _setDriverStanding() {
    if (
      this.seasonWorldChampion == null ||
      this.seasonWorldChampion.DriverStandings == null ||
      this.seasonWorldChampion.DriverStandings.length === 0
    ) {
      return;
    }

    return this.seasonWorldChampion.DriverStandings[0];
  }
}
