import { ApiService } from './api.service';
import { APIUrl, APIMethods } from './../constants/api-constants';
import { Injectable } from '@angular/core';
import { IDestination } from '../interfaces/destination.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(
    private apiService: ApiService
  ) { }

  async getDestinations(destinationId?: string): Promise<IDestination[]> {
    let params = null;
    if (destinationId) {
      params = new HttpParams().set('destinationId', destinationId);
    }
    const destinatonUrl = APIUrl.getDestinations;
    return await this.apiService.Api(
      APIMethods.get,
      destinatonUrl,
      params
    );
  }

  async getDestinationByContinent(searchBy: string): Promise<IDestination[]> {
    let params = new HttpParams().set('searchBy', searchBy);
    const searchDestination = APIUrl.searchDestination;
    return await this.apiService.Api(
      APIMethods.get,
      searchDestination,
      params
    );
  }
}
