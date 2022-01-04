import { APIEndpoints, APIMethods } from './../constants/api-constants';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { IBooking } from '../interfaces/booking.interface';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import UrlHelper from '../helpers/url-helper';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private apiService: ApiService
  ) { }

  async bookDestination(bookingData: IBooking): Promise<any> {
    const bookDestinationUrl = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.bookDestination]);
    return await this.apiService.Api(APIMethods.post, bookDestinationUrl, null, bookingData);
  }

  async getBookings(userId: string): Promise<Array<IBooking>> {
    const getBookingsUrl = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.getBookings]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(APIMethods.get, getBookingsUrl, params);
  }
}
