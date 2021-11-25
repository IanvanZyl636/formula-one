import { IRaceModel } from 'src/app/integration/ergast/models/race.model';
import { AsyncState } from './async.model';

export interface SeasonState extends AsyncState {
  races: IRaceModel[] | undefined;
}
