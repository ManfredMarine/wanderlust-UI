import { IDestination } from './../../../shared/interfaces/destination.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styles: [
  ]
})
export class DestinationDetailsComponent implements OnInit {

  @Input() destination: IDestination | undefined;
  @Input() showBookingForm: boolean = true;
  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}