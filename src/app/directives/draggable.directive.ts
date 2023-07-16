import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';


export interface DraggableItemType {
  nodeId: string;
  targetId: string;
  reference: "above"|"below";
}
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private el: ElementRef) { }
  @Input() defaultColor: string = "red";
  @Input('myHighlight') highlightColor: string | undefined = undefined;

  @Input('nodeId') nodeId: string | undefined = undefined;

  @Output('onNodeMove') onNodeMove: EventEmitter<DraggableItemType> = new EventEmitter();

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight("transparent");
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.draggable = "true";
  }

  @HostListener('dragstart', ['$event']) onDragStart(e:any) {
    if (this.nodeId) {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text', this.nodeId);
      }
      (e.currentTarget as any).classList.add("drag-start");
    }
  }

  @HostListener('dragend', ['$event']) onDragEnd(e: any) {
    if (this.nodeId) {
      (e.currentTarget as any).classList.remove("drag-start");
    }
  }

  @HostListener('dragover', ['$event']) onDragover(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    const item = e.currentTarget as HTMLDivElement;
    const boundingRect = item.getBoundingClientRect();
    const middleOfDiv = boundingRect.top + (boundingRect.height / 2);
    if (e.clientY < middleOfDiv) {
      item.classList.remove("drag-below");
      item.classList.add("drag-above");
    } else {
      item.classList.remove("drag-above");
      item.classList.add("drag-below");
    }
  }

  @HostListener('drag', ['$event']) onDrag(e: any) {
    // Do nothing for now
  }

  @HostListener('drop', ['$event']) onDrop(e: any) {
    function InvertPosition(position: any) {
      return position;
    }

    e.preventDefault();
    if (this.nodeId) {
      if (e.type !== "drop") {
        return;
      }
      // Stores dragged elements ID in var draggedId

      let draggedId;
      if (e.dataTransfer) {
        draggedId = e.dataTransfer.getData("text");
      }
      else if ((e as any).originalEvent.dataTransfer) {
        draggedId = (e as any).originalEvent.dataTransfer.getData("text");
      }


      const isAbove = (e.currentTarget as any).classList.contains("drag-above");
      const isBelow = (e.currentTarget as any).classList.contains("drag-below");

      (e.currentTarget as any).classList.remove("drag-enter", "drag-above", "drag-below");

      if (draggedId === this.nodeId) {
        return;
      }

      const reference = isAbove ? "above" : "below";
      // if (typeof this.onNodeMove==="function") this.onNodeMove(draggedId, this.nodeId, reference)
      this.onNodeMove.emit({nodeId:draggedId, targetId: this.nodeId, reference})
    }
  }

  @HostListener('dragenter', ['$event']) onDragEnter(e: any) {
    this.handleDragEnterLeave(e);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(e: any) {
    this.handleDragEnterLeave(e);
  }


  private handleDragEnterLeave(e: any) {
    if (e.type === "dragenter") {
      (e.currentTarget as any).classList.add("drag-enter");
    } else {
      (e.currentTarget as any).classList.remove("drag-enter", "drag-above", "drag-below");
    }
  }


}
