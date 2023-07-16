import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

export interface MenuItemEntry {
  id?: number;
  title: string;
  action?: ()=>void;
  children?: MenuItemEntry[];
};

export interface MenuItemsResponse {
  mainMenu: MenuItemEntry[];
  subMenus: MenuItemEntry[][]
}
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private _observableMenuItems = new Subject<MenuItemsResponse>();


  private _menuItems: MenuItemEntry[] = [];

  setMenuItems(original: MenuItemEntry[]) {
    this._menuItems = original;
    this.preProcess();
  }
  
  private _menuTrigger: any;
  setMenuTrigger(menuTrigger: any) {
      this._menuTrigger = menuTrigger;
  }

  openMenuEvent(e: MouseEvent, menuItems: MenuItemEntry[]) {
    e.preventDefault();
    e.stopPropagation();
    this.setMenuItems(menuItems);
    setTimeout(()=>{
      this._menuTrigger.open(e);
    }, 100)

  }

  openMenuXY(x: number, y: number, menuItems: MenuItemEntry[]) {
    this.setMenuItems(menuItems);
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


  preProcess() {

    const menuItemsMain:MenuItemEntry[] = [];
    const subMenus:MenuItemEntry[][] = [];

    const processItem = (m: MenuItemEntry) => {
      const newItem =
        {id: m.children ? 0 : undefined  as undefined| number, title: m.title, action: m.action, children: undefined };

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
