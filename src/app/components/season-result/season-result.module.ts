import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonResultComponent } from './season-result.component';
import { PageModule } from '../page/page.module';
import { RouterModule } from '@angular/router';

export const singlePageLazyLoad = RouterModule.forChild([
  { path: '', component: SeasonResultComponent },
]);

@NgModule({
  declarations: [SeasonResultComponent],
  imports: [CommonModule, PageModule, singlePageLazyLoad],
  exports: [SeasonResultComponent],
})
export class SeasonResultModule {}
