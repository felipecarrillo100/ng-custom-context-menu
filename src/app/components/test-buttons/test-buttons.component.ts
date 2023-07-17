import { Component } from '@angular/core';
import { ContextMenuService, MenuItemEntry, MenuItemEntryInternal } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-test-buttons',
  templateUrl: './test-buttons.component.html',
  styleUrls: ['./test-buttons.component.scss']
})
export class TestButtonsComponent {

  constructor(private contextMenuService: ContextMenuService) {
    
  }

  openProgramatically1(e: MouseEvent) {
    this.contextMenuService.openMenuEvent(e, this.menuItems21);
    //this.contextMenuService.openMenuXY(169, 240, this.menuItems21);
  }

  openProgramatically2(e: MouseEvent) {
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
        {title: "Paste special", action: undefined, children: [
            {title: "A", action: ()=>{}},
            {title: "B", action: ()=>{}},
          ]},
      ]},
    {title: "Duplicate", action: undefined, children: [
        { title: "Duplicate", action: ()=>{}},
        { title: "Delete", action: ()=>{}},
      ]}
  ];

  public menuItems22: MenuItemEntry[] = [
    {title: "Compile", action: ()=>{} },
    {title: "Run", action: ()=>{}},
    {title: "Debug", action: ()=>{}},
    {divider: true},
    {title: "Build", action: undefined, children: [
        {title: "Build Project", action: ()=>{} },
        {title: "Rebuild", action: ()=>{}},
      ]}
  ];

}
