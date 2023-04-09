import { Component, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textModal(modalRef: ElementRef | undefined) {
    if (modalRef) {
      const modal = new Modal(modalRef.nativeElement);
      modal.show(); 
    }
  }
}
