import { ToastrService } from 'ngx-toastr';
import { BookingService } from './../../../shared/services/booking.service';
import { IUser } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IDestination } from './../../../shared/interfaces/destination.interface';
import { Component, Input, OnInit } from '@angular/core';
import RequestBodyHelper from 'src/app/shared/helpers/request-body-helper';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import DateHelper from 'src/app/shared/helpers/date-helper';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styles: [],
})
export class BookingFormComponent implements OnInit {
  @Input()
  destination!: IDestination;
  bookingForm: FormGroup;
  userData!: IUser;
  totalCharges = 0;
  bookingFormSubmitted = false;
  destinationBooked = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router,
    private acitveModal: NgbActiveModal,
    private toast: ToastrService
  ) {
    this.bookingForm = this.formBuilder.group({
      noOfPersons: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      checkInDate: ['', [Validators.required, this.pasDateValidator]],
      includeFlight: [false],
    });
    this.setUserData();
  }

  ngOnInit(): void {}

  setUserData() {
    this.userData = this.userService.getUserData();
  }

  async calculateCharges() {
    this.bookingFormSubmitted = true;
    if (this.bookingForm.valid) {
      const noOfPersons = this.bookingForm.controls.noOfPersons.value;
      const perPersonCharges = this.destination?.chargesPerPerson;
      this.totalCharges = noOfPersons * perPersonCharges;
      if (this.bookingForm.controls.includeFlight.value === true) {
        const flightCharges = noOfPersons * this.destination.flightCharges;
        if (!isNaN(flightCharges)) {
          this.totalCharges += flightCharges;
        }
      }
    }
  }

  async bookDestination() {
    this.bookingFormSubmitted = true;
    if (this.bookingForm.valid) {
      this.calculateCharges();
      const bookingReqBody = RequestBodyHelper.getBookDestinationReqBody(
        this.destination,
        this.bookingForm?.getRawValue(),
        this.userData?.userId,
        this.totalCharges
      );
      const booked = await this.bookingService.bookDestination(bookingReqBody);
      this.toast.success(booked.message);
      this.acitveModal.close();
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
    this.acitveModal.close();
  }

  pasDateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value) {
      const isPastDate = DateHelper.isPastDate(control.value);
      if (isPastDate) {
        return { pastDate: true };
      }
    }
    return null;
  }
}
