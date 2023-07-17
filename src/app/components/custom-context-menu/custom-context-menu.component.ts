import { Component, Input, QueryList, ViewChildren, ViewChild} from '@angular/core';
import {ContextMenuComponent} from "@perfectmemory/ngx-contextmenu";
import { ContextMenuService, MenuItemEntryInternal } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-custom-context-menu',
  templateUrl: './custom-context-menu.component.html',
  styleUrls: ['./custom-context-menu.component.scss']
})
export class CustomContextMenuComponent {
  @Input()
  public rtl: boolean=false;

  @Input()
  public disabled: boolean=false;
  
  @Input()
  public menuClass: string="";

  // @ts-ignore
  @ViewChild('menuTrigger') menuTrigger: ContextMenuComponent;
  @ViewChild('oneContextMenu') oneContextMenu: any;

  // @ts-ignore
  @ViewChildren(ContextMenuComponent) components: QueryList<ContextMenuComponent>

  private _menuItems: MenuItemEntryInternal[] = [];
  public _menuItemsMain: MenuItemEntryInternal[] = [];
  public _subMenus: MenuItemEntryInternal[][] = [];
  public value:string = "Main Context Menu";

  public getSubMenu(menuId:number) {
    if (!this.components) return this.oneContextMenu;
    const subMenu = this.components.get(menuId);
    const item = subMenu ? subMenu : this.oneContextMenu;
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
