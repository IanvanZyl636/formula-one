import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';
import { AsyncState } from './async.model';

export interface WorldChampionsState extends AsyncState {
  seasonsWorldChampion: IStandingModel[] | undefined;
}
