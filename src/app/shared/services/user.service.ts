import { AutosaveService } from './autosave.service';
import { APIUrl, APIMethods } from './../constants/api-constants';
import { ApiService } from './api.service';
import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: IUser | undefined | null;
  userData$ = new Subject<IUser | null>();
  constructor(
    private apiService: ApiService,
    private autosave: AutosaveService
  ) { }

  async login(credentials: any) {
    const loginUrl = APIUrl.login;
    return await this.apiService.Api(APIMethods.post, loginUrl, null, credentials);
  }

  async register(userData: IUser) {
    const registerUrl = APIUrl.register;
    return await this.apiService.Api(APIMethods.post, registerUrl, null, userData);
  }

  logout() {
    this.setUserData(null);
  }

  setUserData(userData: IUser | null) {
    this.userData = userData;
    this.publishUserData(userData);
  }

  publishUserData(userData: IUser | null) {
    this.userData$?.next(userData);
  }

  setUserDataInCache(userData: IUser) {
    this.autosave.setUserData(userData);
  }

  async removeUserDataFromCache() {
    await this.autosave.removeUserData();
  }

  getUserData(): IUser | any {
    return this.userData;
  }

  getUserName(): string | undefined | null {
    if (this.userData) {
      return this.userData.name;
    }
    return null;
  }

  getUserId(): string | undefined | null {
    if (this.userData) {
      return this.userData.userId;
    }
    return null;
  }
}
