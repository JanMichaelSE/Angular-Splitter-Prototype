import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-splitter',
  templateUrl: './custom-splitter.component.html',
  styleUrls: ['./custom-splitter.component.css']
})
export class CustomSplitterComponent {
  private isResizing = false;

  constructor(private el: ElementRef) {}

  onMouseDown(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const containerRect = this.el.nativeElement.querySelector('.splitter-container').getBoundingClientRect();
    const leftPaneWidth = event.clientX - containerRect.left;
    const rightPaneWidth = containerRect.width - leftPaneWidth;

    this.el.nativeElement.querySelector('.splitter-pane:first-child').style.flex = `${leftPaneWidth} 1 0%`;
    this.el.nativeElement.querySelector('.splitter-pane:last-child').style.flex = `${rightPaneWidth} 1 0%`;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }
}
