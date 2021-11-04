import { DestinationService } from './../../shared/services/destination.service';
import { IBooking } from './../../shared/interfaces/booking.interface';
import { UserService } from './../../shared/services/user.service';
import { IUser } from './../../shared/interfaces/user.interface';
import { BookingService } from './../../shared/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DestinationDetailsComponent } from 'src/app/library/shared-components/destination-details/destination-details.component';
import { IDestination } from 'src/app/shared/interfaces/destination.interface';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {

  bookings: IBooking[] = [];
  userData!: IUser | null;
  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private modal: NgbModal,
    private destinationService: DestinationService
  ) {
    this.userData = userService.getUserData();
  }

  async ngOnInit() {
    if (this.userData) {
      await this.setBookings();
    } else {
      this.userService.userData$.subscribe(async (userData: IUser | null) => {
        this.userData = userData;
        await this.setBookings();
      });
    }
  }


  async setBookings() {
    if (this.userData?.userId) {
      this.bookings = await this.bookingService.getBookings(this.userData.userId);
    } else {
      this.bookings = [];
    }
  }

  async viewDetails(booking: IBooking) {
    const destination = await this.destinationService.getDestinations(booking.destinationId);
    const modalOptions: NgbModalOptions = {
      size: 'xl'
    }
    const modalRef: NgbModalRef = this.modal.open(DestinationDetailsComponent, modalOptions);
    modalRef.componentInstance.destination = destination;
    modalRef.componentInstance.showBookingForm = false;
  }

}
