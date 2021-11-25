import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuModule } from './components/nav-menu/nav-menu.module';
import { HttpClientModule } from '@angular/common/http';
import { WorldChampionsModule } from './components/world-champions/world-champions.module';
import { StoreModule } from '@ngrx/store';
import { worldChampionsReducer } from './ngrx-store/reducers/world-champions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorldChampionsEffects } from './ngrx-store/effects/world-champions.effects';
import { seasonReducer } from './ngrx-store/reducers/season.reducer';
import { SeasonEffects } from './ngrx-store/effects/season.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavMenuModule,
    HttpClientModule,
    WorldChampionsModule,
    StoreModule.forRoot({
      worldChampionsState: worldChampionsReducer,
      seasonState: seasonReducer,
    }),
    EffectsModule.forRoot([WorldChampionsEffects, SeasonEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
