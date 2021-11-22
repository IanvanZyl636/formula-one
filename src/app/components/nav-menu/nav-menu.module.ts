import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { MenuLogoComponent } from './components/menu-logo/menu-logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavMenuComponent,
    MainMenuComponent,
    MobileMenuComponent,
    MenuLogoComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
