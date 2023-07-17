import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

export interface MenuItemEntryInternal {
  id?: number;
  title: string;
  action?: ()=>void;
  children?: MenuItemEntryInternal[];
  disabled: boolean;
  divider: boolean;
  passive: boolean;
};

export type MenuItemEntry = MenuItemEntryWithData | MenuItemEntrySeparator;

interface MenuItemEntryWithData {
  title: string;
  action?: ()=>void;
  children?: MenuItemEntry[];
  disabled?: boolean;
  passive?: boolean;
};

export interface MenuItemEntrySeparator {
  divider: true;
};


export interface MenuItemsResponse {
  mainMenu: MenuItemEntryInternal[];
  subMenus: MenuItemEntryInternal[][]
}
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private _observableMenuItems = new Subject<MenuItemsResponse>();

  setMenuItems(original: MenuItemEntry[]) {
    this.preProcess(original);
  }

  private _menuTrigger: any;
  setMenuTrigger(menuTrigger: any) {
      this._menuTrigger = menuTrigger;
  }

  hasOpen() {
    return this._menuTrigger.hasOpen();
  }

  close() {
    return this._menuTrigger.close();
  }
  openMenuEvent(e: MouseEvent, menuItems: MenuItemEntry[]) {
    e.preventDefault();
    e.stopPropagation();
    this.setMenuItems(menuItems);
    setTimeout(()=>{
      this._menuTrigger.open(e);
    }, 1)
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
    }, 1)

  }

  preProcess(original: MenuItemEntry[]) {

    const menuItemsMain:MenuItemEntryInternal[] = [];
    const subMenus:MenuItemEntryInternal[][] = [];

    const processItem = (o: MenuItemEntry) => {
      if ((o as MenuItemEntrySeparator).divider) {
        const separator =
          {id:  undefined  as undefined| number, title: "", action: ()=>{}, children: undefined, disabled: false, separator: true, passive:false };
      }
      const m = o as MenuItemEntryWithData;
      const newItem: MenuItemEntryInternal =
        { id: m.children ? 0 : undefined  as undefined| number, 
          title: m.title, action: m.action, 
          children: undefined, 
          disabled: m.disabled ? m.disabled : false, 
          divider:false,
          passive: m.passive ? m.passive : false,
        };

      if (m.children) {
        const newSubMenu: MenuItemEntryInternal[] = [];
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

    if (!original) return;
    for (const mItem of original) {
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
