import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as localforage from 'localforage';
import { clientStoreConfig } from '../../client-store.config';

@Injectable({
  providedIn: 'root'
})
export class ClientStoreService {

  public store: any;

  constructor(private toastr: ToastrService) {
    this.store = localforage.config(clientStoreConfig);
    this.handleError = this.handleError.bind(this);
  }

  public setItem(key: any, value: any, serialise = (data: any) => data) {
    localforage
      .setItem(key, JSON.parse(JSON.stringify(serialise(value))))
      .catch(this.handleError);
  }
  public async getItem(key: any, deserialise = (data: any) => data) {
    const returningValue = await localforage
      .getItem(key)
      .catch(this.handleError);
    return deserialise(returningValue);
  }

  /**
   * This method removes the key from the local forage
   */
  public async removeItem(key: any) {
    const data = await this.getItem(key);
    if (data) {
      await localforage.removeItem(key);
    }
  }

  public async clearCache() {
      await localforage.clear();
  }

  private handleError(error: any) {
    if (error instanceof DOMException) {
      this.toastr.warning('something went wrong');
    }
  }
}
