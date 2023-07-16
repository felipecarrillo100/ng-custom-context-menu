import {ElementRef, NgModule, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContextMenuModule} from "@perfectmemory/ngx-contextmenu";
import { ListComponent } from './components/list/list.component';
import { DraggableDirective } from './directives/draggable.directive';
import { CustomContextMenuComponent } from './components/custom-context-menu/custom-context-menu.component';
import { TestListComponentComponent } from './components/test-list-component/test-list-component.component';
import { TestButtonsComponent } from './components/test-buttons/test-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DraggableDirective,
    CustomContextMenuComponent,
    TestListComponentComponent,
    TestButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
