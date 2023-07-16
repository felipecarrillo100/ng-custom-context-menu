import {Component, ElementRef, ViewChildren} from '@angular/core';
import { MenuItemEntry } from './components/custom-context-menu/custom-context-menu.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-sassy-app';
  public value: string = 'a simple value attached to the context menu';


   public menuItems: MenuItemEntry[] = [];

  public execute(s: string, e: any) {
     console.log(s);
  }

}
