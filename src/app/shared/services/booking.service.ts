import { APIUrl, APIMethods } from './../constants/api-constants';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { IBooking } from '../interfaces/booking.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private apiService: ApiService
  ) { }

  async bookDestination(bookingData: IBooking) {
    const bookDestinationUrl = APIUrl.bookDestination;
    return await this.apiService.Api(APIMethods.post, bookDestinationUrl, null, bookingData);
  }

  async getBookings(userId: string): Promise<Array<IBooking>> {
    const getBookingsUrl = APIUrl.getBookings;
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(APIMethods.get, getBookingsUrl, params);
  }
}
