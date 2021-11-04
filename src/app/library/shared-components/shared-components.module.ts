import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';
import { DestinationCardComponent } from './destination-card/destination-card.component';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

@NgModule({
  declarations: [
    ConfirmationPromptComponent,
    DestinationCardComponent,
    DestinationDetailsComponent,
    BookingFormComponent,
  ],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [
    DestinationCardComponent,
    ConfirmationPromptComponent,
    DestinationDetailsComponent,
    BookingFormComponent,
  ],
})
export class SharedComponentsModule {}
