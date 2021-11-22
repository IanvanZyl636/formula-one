import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldChampionCardComponent } from './world-champion-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WorldChampionCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [WorldChampionCardComponent],
})
export class WorldChampionCardModule {}
