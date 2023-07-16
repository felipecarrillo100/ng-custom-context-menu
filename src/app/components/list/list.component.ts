import { Component } from '@angular/core';
import {DraggableItemType} from "../../directives/draggable.directive";

interface ListItem {
  id: string;
  title: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
   public myList: ListItem[];

   constructor() {
     this.myList = [
       {id: "1", title:"Item 1"},
       {id: "2", title:"Item 2"},
       {id: "3", title:"Item 2"},
     ]
   }
  onNodeMove(item: DraggableItemType) {
    console.log("Node to move:" + JSON.stringify(item));
  }
}
