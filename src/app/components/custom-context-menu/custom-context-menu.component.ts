import { Component, Input, QueryList, ViewChildren, ViewChild} from '@angular/core';
import {ContextMenuComponent} from "@perfectmemory/ngx-contextmenu";
import { ContextMenuService, MenuItemEntry } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-custom-context-menu',
  templateUrl: './custom-context-menu.component.html',
  styleUrls: ['./custom-context-menu.component.scss']
})
export class CustomContextMenuComponent {
  // @ts-ignore
  @ViewChild('menuTrigger') menuTrigger: ContextMenuComponent;

  // @ts-ignore
  @ViewChildren(ContextMenuComponent) components: QueryList<ContextMenuComponent>

  private _menuItems: MenuItemEntry[] = [];
  public _menuItemsMain: MenuItemEntry[] = [];
  public _subMenus: MenuItemEntry[][] = [];

  public getSubMenu(menu: any) {
    const item = this.components ? this.components.get(Number(menu.id)) : undefined;
    // return this.mapContainer;
    return item;
  }

  executeAction(menuItem: any) {
    if (typeof menuItem.action === "function") menuItem.action();
  }

  constructor(private contextMenuService: ContextMenuService) {
    contextMenuService.onMenuUpdate().subscribe((v)=>{
      this._menuItemsMain = v.mainMenu;
      this._subMenus = v.subMenus
    })
  }

  ngAfterViewInit() {
    setTimeout(()=>{
        this.contextMenuService.setMenuTrigger(this.menuTrigger);
    },0)
  }

}
