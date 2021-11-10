import { DestinationDetailsComponent } from './../../library/shared-components/destination-details/destination-details.component';
import { IDestination } from './../../shared/interfaces/destination.interface';
import { DestinationService } from '../../shared/services/destination.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {
  searchTerm = null;
  destinations: IDestination[] = null;
  searchApplied = false;
  constructor(
    private toastr: ToastrService,
    private destinationService: DestinationService,
    private modal: NgbModal
  ) { }

  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      this.destinations = await this.getDestinations();
    }, 2000);
  }

  async getDestinations(): Promise<IDestination[]> {
    return await this.destinationService.getDestinations();
  }

  viewDetails(destination: IDestination): void {
    const modalOptions: NgbModalOptions = {
      size: 'xl'
    };
    const modalRef: NgbModalRef = this.modal.open(DestinationDetailsComponent, modalOptions);
    modalRef.componentInstance.destination = destination;
  }

  async search(): Promise<void> {
    this.searchApplied = false;
    if (this.searchTerm?.length) {
      this.destinations = null;
      this.destinations = await this.destinationService.getDestinationByContinent(this.searchTerm);
      this.searchApplied = true;
    }
  }

  resetSearchApplied(): void {
    this.searchApplied = false;
  }

  async showAllTours(): Promise<void> {
    this.destinations = null;
    this.searchApplied = false;
    this.searchTerm = '';
    this.destinations = await this.getDestinations();
  }
}
