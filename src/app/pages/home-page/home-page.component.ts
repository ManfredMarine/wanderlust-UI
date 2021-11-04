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
  destinations: IDestination[] = [];
  constructor(
    private toastr: ToastrService,
    private destinationService: DestinationService,
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    setTimeout(async () => {
      this.destinations = await this.getDestinations();  
    }, 2000)  
  }

  async getDestinations(): Promise<IDestination[]> {
    return await this.destinationService.getDestinations();
  }

  viewDetails(destination: IDestination) {
    const modalOptions: NgbModalOptions = {
      size: 'xl'
    }
    const modalRef: NgbModalRef = this.modal.open(DestinationDetailsComponent, modalOptions);
    modalRef.componentInstance.destination = destination;
  }

  search() {

  }
}
