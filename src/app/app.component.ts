import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  visible: boolean = true; // Modal Visibility
  isEditable = true; // Manages form being editable

  // Needed for Form funcitonality
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  // Grab Elements to measure form width
  @ViewChild('formDiv') formDiv: ElementRef | null = null;
  @ViewChild('stepperContainer') stepperContainer: ElementRef | null = null;

  // Observer use to listen for resize on the form div
  private resizeObserver: ResizeObserver | null = null;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {}

  // Initialize the observer after all content is present on the page
  ngAfterViewInit() {
    this.initResizeObserver();
  }

  // Destroy observer so it stops listening once the component is destroyed.
  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initResizeObserver() {
    // Exit if elements are not present
    if (!this.formDiv || !this.stepperContainer) {
      return;
    }

    // Fire the "checkParentWidth" every time a change is made on the Form Div
    this.resizeObserver = new ResizeObserver(() => {
      this.checkParentDivWidth();
      });

    // This setups up the observer on the Form Div Element 
    this.resizeObserver.observe(this.formDiv.nativeElement);
  }

  private checkParentDivWidth() {
    // Exit if elements are not present
    if (!this.formDiv || !this.stepperContainer) {
      return;
    }

    // Grab the Form Div Width
    const parentDivWidth = this.formDiv.nativeElement.offsetWidth;
    const threshold = 600; // Adjust this value based on your requirements

    // Hide the Stepper Container Div if the threshold is met
    if (parentDivWidth < threshold) {
      this.renderer.setStyle(this.stepperContainer.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.stepperContainer.nativeElement, 'display', 'block');
    }
  }

  // For showing the big full screen modal
  showDialog() {
    this.visible = true;
  }
}
