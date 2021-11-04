import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public async Api(method: string, apiUrl: any, params?: any, reqBody?: any): Promise<any> {
    if (params) {
      return await this.httpClient.request(method, apiUrl, { body: reqBody, params }).toPromise();
    } else {
      return await this.httpClient.request(method, apiUrl, { body: reqBody }).toPromise();
    }
  }
}
