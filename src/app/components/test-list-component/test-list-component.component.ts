import { Component } from '@angular/core';
import { ContextMenuServiceService, MenuItemEntry } from 'src/app/services/context-menu-service.service';

@Component({
  selector: 'app-test-list-component',
  templateUrl: './test-list-component.component.html',
  styleUrls: ['./test-list-component.component.scss']
})
export class TestListComponentComponent {
  public list = [
    { name: "abc", title: "123"},
    { name: "def", title: "456"},
    { name: "ghi", title: "789"}
  ]
  private menu: MenuItemEntry[] = [
      {title: "Yes", action: ()=>{} },
      {title: "No", action: ()=>{}},
      {title: "Maybe", action: ()=>{}},
  ];
  
  constructor(private contextMenuService: ContextMenuServiceService) {
  }


  openContextMenu(e: any) {
    this.contextMenuService.openMenuEvent(e, this.menu);
  }
}
