import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonResultComponent } from './season-result.component';
import { PageModule } from '../page/page.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { seasonReducer } from 'src/app/ngrx-store/reducers/season.reducer';
import { SeasonEffects } from 'src/app/ngrx-store/effects/season.effects';
import { EffectsModule } from '@ngrx/effects';

const singlePageLazyLoad = RouterModule.forChild([
  { path: '', component: SeasonResultComponent },
]);

@NgModule({
  declarations: [SeasonResultComponent],
  imports: [CommonModule, PageModule, singlePageLazyLoad],
  exports: [SeasonResultComponent],
})
export class SeasonResultModule {}
