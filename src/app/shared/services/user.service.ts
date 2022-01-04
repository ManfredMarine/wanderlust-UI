import { AutosaveService } from './autosave.service';
import { APIMethods, APIEndpoints } from './../constants/api-constants';
import { ApiService } from './api.service';
import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import UrlHelper from '../helpers/url-helper';

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

  async login(credentials: any): Promise<IUser> {
    const loginUrl = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.login]);
    return await this.apiService.Api(APIMethods.post, loginUrl, null, credentials);
  }

  async register(userData: IUser): Promise<IUser> {
    const registerUrl = UrlHelper.createUrl([environment.baseUrl, APIEndpoints.register]);
    return await this.apiService.Api(APIMethods.post, registerUrl, null, userData);
  }

  logout(): void {
    this.setUserData(null);
  }

  setUserData(userData: IUser | null): void {
    this.userData = userData;
    this.publishUserData(userData);
  }

  publishUserData(userData: IUser | null): void {
    this.userData$?.next(userData);
  }

  setUserDataInCache(userData: IUser): void {
    this.autosave.setUserData(userData);
  }

  async removeUserDataFromCache(): Promise<void> {
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
