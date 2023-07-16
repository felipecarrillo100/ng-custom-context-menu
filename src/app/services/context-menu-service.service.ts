import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';
import { MenuItemEntry } from '../components/custom-context-menu/custom-context-menu.component';

interface MenuItemsResponse {
  mainMenu: MenuItemEntry[];
  subMenus: MenuItemEntry[][]
}
@Injectable({
  providedIn: 'root'
})
export class ContextMenuServiceService {
  private _observableMenuItems = new Subject<MenuItemsResponse>();

  private _menuTrigger: any;
  setMenuTrigger(menuTrigger: any) {
      this._menuTrigger = menuTrigger;
  }

  openMenuEvent(e: MouseEvent, menuItems: MenuItemEntry[]) {
    e.preventDefault();
    e.stopPropagation();
    this.menuItems = menuItems;
    setTimeout(()=>{
      this._menuTrigger.open(e);
    }, 100)

  }

  openMenuXY(x: number, y: number, menuItems: MenuItemEntry[]) {
    this.menuItems = menuItems;
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    })

    setTimeout(()=>{
      this._menuTrigger.open(event);
    }, 100)

  }

  // @ts-ignore
  private _menuItems: MenuItemEntry[] = [];

  get menuItems(): MenuItemEntry[] {
    return this._menuItems;
  }

  set menuItems(original: MenuItemEntry[]) {
    this._menuItems = original;
    this.preProcess();
  }
  preProcess() {

    const menuItemsMain:MenuItemEntry[] = [];
    const subMenus:MenuItemEntry[][] = [];

    const processItem = (m: MenuItemEntry) => {
      const newItem =
        {id: undefined  as undefined| number, title: m.title, action: m.action, children: undefined };

      if (m.children) {
        const newSubMenu: MenuItemEntry[] = [];
        subMenus.push(newSubMenu);
        const index = subMenus.length;
        newItem.id = index;
        for (const child of m.children) {
          const c = processItem(child);
          newSubMenu.push(c);
        }
      }
      return newItem;
    }

    if (!this._menuItems) return;
    for (const mItem of this._menuItems) {
      const newItem = processItem(mItem);
      menuItemsMain.push(newItem);
    }
    
    this._observableMenuItems.next({
      mainMenu: menuItemsMain,
      subMenus: subMenus
    });

  }



  onMenuUpdate(): Observable<MenuItemsResponse> {
    return this._observableMenuItems.asObservable();
  }

}
