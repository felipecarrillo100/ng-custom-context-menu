import { Component } from '@angular/core';
import { ContextMenuServiceService } from 'src/app/services/context-menu-service.service';
import { MenuItemEntry } from '../custom-context-menu/custom-context-menu.component';

@Component({
  selector: 'app-test-buttons',
  templateUrl: './test-buttons.component.html',
  styleUrls: ['./test-buttons.component.scss']
})
export class TestButtonsComponent {

  constructor(private contextMenuService: ContextMenuServiceService) {
    
  }

  openProgramatically1(e: MouseEvent) {
    //if (typeof this.menuTrigger !== undefined) this.menuTrigger.open(e);
    this.contextMenuService.openMenuEvent(e, this.menuItems21);
    //this.contextMenuService.openMenuXY(169, 240, this.menuItems21);
  }

  openProgramatically2(e: MouseEvent) {
    //if (typeof this.menuTrigger !== undefined) this.menuTrigger.open(e);
    this.contextMenuService.openMenuEvent(e, this.menuItems22);
    // this.contextMenuService.openMenuXY(320, 240, this.menuItems22);
  }


  public menuItems21: MenuItemEntry[] = [
    {title: "Cut", action: ()=>{} },
    {title: "Copy", action: ()=>{}},
    {title: "Paste", action: ()=>{}},
    {title: "SubMenu 1", action: undefined, children: [
        {title: "Paste as HTML", action: ()=>{} },
        {title: "Paste unformatted", action: ()=>{}},
        {title: "SubMenu 3", action: undefined, children: [
            {title: "A", action: ()=>{}},
            {title: "B", action: ()=>{}},
          ]},
      ]},
    {title: "SubMenu 2", action: undefined, children: [
        { title: "Duplicate", action: ()=>{}},
        { title: "Delete", action: ()=>{}},
      ]}
  ];

  public menuItems22: MenuItemEntry[] = [
    {title: "Compile", action: ()=>{} },
    {title: "Run", action: ()=>{}},
    {title: "Debug", action: ()=>{}},
    {title: "Build", action: undefined, children: [
        {title: "Paste as HTML", action: ()=>{} },
        {title: "Paste unformatted", action: ()=>{}},
      ]}
  ];

}
