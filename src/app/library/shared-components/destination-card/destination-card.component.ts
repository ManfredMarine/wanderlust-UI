import { IDestination } from './../../../shared/interfaces/destination.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-destination-card',
  templateUrl: './destination-card.component.html',
  styles: [
  ]
})
export class DestinationCardComponent implements OnInit {

  @Input() destination: IDestination | undefined;
  @Output() viewDetails = new EventEmitter<IDestination>();
  constructor() { }

  ngOnInit(): void {
  }

  showDestinationDetails(destination: IDestination) {
    this.viewDetails.emit(destination);
  }

}
