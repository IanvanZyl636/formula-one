import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IMenuItemModel } from '../../models/menu-item.model';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  @Input() public menuItems: IMenuItemModel[] = [];
  public faBars = faBars;
  public isMobileDropdownMenuOpen = false;

  constructor() {}
}
