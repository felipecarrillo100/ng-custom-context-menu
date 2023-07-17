import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

export interface MenuItemEntryInternal {
  submenu?: number;
  title: string;
  action?: ()=>void;
  children?: MenuItemEntryInternal[];
  disabled: boolean;
  divider: boolean;
  passive: boolean;
  checkbox?: {value: boolean};
  icon?: string;
};

export type MenuItemEntry = MenuItemEntryWithData | MenuItemEntrySeparator;

interface MenuItemEntryWithData {
  title: string;
  action?: ()=>void;
  children?: MenuItemEntry[];
  disabled?: boolean;
  passive?: boolean;
  checkbox?: {value: boolean}
  icon?: string;
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
        const separator: MenuItemEntryInternal =
          {submenu:  undefined, title: "", action: undefined, children: undefined, disabled: true, divider: true, passive:false };
        return separator;
      }
      const m = o as MenuItemEntryWithData;
      const newItem: MenuItemEntryInternal =
        { submenu: undefined, 
          title: m.title, 
          action: m.action, 
          children: undefined, 
          disabled: m.disabled ? m.disabled : false, 
          divider:false,
          passive: m.passive ? m.passive : false,
          checkbox: m.checkbox,
          icon: m.icon
        };

      if (m.children) {
        const newSubMenu: MenuItemEntryInternal[] = [];
        subMenus.push(newSubMenu);
        // Index to the dynamically created submenu
        const index = subMenus.length;
        newItem.submenu = index;
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
