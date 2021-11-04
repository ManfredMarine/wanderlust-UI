import { ClientStoreService } from './client-store.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutosaveService {

  constructor(
    private clientStore: ClientStoreService
  ) { }

  async setUserData(userData: any) {
    this.clientStore.setItem('user', userData);
  }

  async getUserData() {
    return await this.clientStore.getItem('user');
  }

  async removeUserData() {
    await this.clientStore.removeItem('user');
  }

}
