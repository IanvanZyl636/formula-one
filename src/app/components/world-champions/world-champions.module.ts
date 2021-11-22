import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldChampionsComponent } from './world-champions.component';
import { PageModule } from '../page/page.module';
import { WorldChampionCardModule } from '../world-champion-card/world-champion-card.module';

@NgModule({
  declarations: [WorldChampionsComponent],
  imports: [CommonModule, PageModule, WorldChampionCardModule],
})
export class WorldChampionsModule {}
