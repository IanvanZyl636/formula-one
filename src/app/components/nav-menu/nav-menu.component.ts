import { Component } from '@angular/core';
import { IMenuItemModel } from './models/menu-item.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  public menuItems: IMenuItemModel[] = [
    { route: ['/'], description: 'Season World Champions' },
  ];

  constructor() {}
}
