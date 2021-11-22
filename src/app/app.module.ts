import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuModule } from './components/nav-menu/nav-menu.module';
import { HttpClientModule } from '@angular/common/http';
import { WorldChampionsModule } from './components/world-champions/world-champions.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavMenuModule,
    HttpClientModule,
    WorldChampionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
