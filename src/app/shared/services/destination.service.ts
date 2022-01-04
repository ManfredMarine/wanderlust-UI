import { ApiService } from './api.service';
import { APIMethods, APIEndpoints } from './../constants/api-constants';
import { Injectable } from '@angular/core';
import { IDestination } from '../interfaces/destination.interface';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import UrlHelper from '../helpers/url-helper';

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
    const destinatonUrl = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.getDestinations]);
    return await this.apiService.Api(
      APIMethods.get,
      destinatonUrl,
      params
    );
  }

  async getDestinationByContinent(searchBy: string): Promise<IDestination[]> {
    const params = new HttpParams().set('searchBy', searchBy);
    const searchDestination = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.searchDestination]);
    return await this.apiService.Api(
      APIMethods.get,
      searchDestination,
      params
    );
  }
}
