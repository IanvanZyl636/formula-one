import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../page/page.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule } from '@angular/router';

const singlePageLazyLoad = RouterModule.forChild([
  { path: '', component: PageNotFoundComponent },
]);

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, PageModule, singlePageLazyLoad],
})
export class PageNotFoundModule {}
