import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldChampionsComponent } from './components/world-champions/world-champions.component';

const routes: Routes = [
  { path: '', redirectTo: 'world-champions', pathMatch: 'full' },
  { path: 'world-champions', component: WorldChampionsComponent },
  {
    path: 'season-result/:year',
    loadChildren: () =>
      import('./components/season-result/season-result.module').then(
        (m) => m.SeasonResultModule
      ),
  },
  {
    path: 'season-result/:year/:driverId',
    loadChildren: () =>
      import('./components/season-result/season-result.module').then(
        (m) => m.SeasonResultModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./components/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
