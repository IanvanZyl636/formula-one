import { Component, Input } from '@angular/core';
import { IMenuItemModel } from '../../models/menu-item.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input() public menuItems: IMenuItemModel[] = [];

  constructor() {}
}
