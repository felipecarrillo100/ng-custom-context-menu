import {Component, ElementRef, ViewChildren} from '@angular/core';
import { MenuItemEntryInternal } from './services/context-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-sassy-app';
  public value: string = 'a simple value attached to the context menu';


   public menuItems: MenuItemEntryInternal[] = [];

  public execute(s: string, e: any) {
     console.log(s);
  }

}
