import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MenuLogoComponent } from './components/menu-logo/menu-logo.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavMenuComponent,
        MainMenuComponent,
        MobileMenuComponent,
        MenuLogoComponent,
      ],
      imports: [RouterTestingModule, FontAwesomeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
