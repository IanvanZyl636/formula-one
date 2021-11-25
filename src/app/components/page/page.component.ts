import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input() public heading: string = '';
  @Input() public isLoading: boolean | null = false;
  @Input() public centerContent: boolean = false;

  constructor() {}
}
