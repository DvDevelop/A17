import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, Session } from '../Shared/dataTypes/auth-info';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn())
  private UserInfo = new BehaviorSubject<UserInfo>(this.getUserInfo())
  loggedIn$ = this.loggedIn.asObservable();
  userinfo$ = this.UserInfo.asObservable();
  private _userInfo: UserInfo = {} as UserInfo
  private token: string = '';
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  setSession(info: Session): void {
    this.token = info.token;
    localStorage.setItem("token", this.token);
    this.setUserInfo(info.user);
    this.loggedIn.next(true);
    this.redirectToHome();
  }

  logOut(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("User")
    this.loggedIn.next(false);
    this._userInfo = {
      avatar: '',
      collectionName: '',
      email: '',
      id: '',
      name: '',
      username: ''
    }
    this.UserInfo.next(this._userInfo)
    this.redirectToHome();
  }

  setUserInfo(record: any): void {
    this._userInfo.avatar = record.avatar;
    this._userInfo.collectionName = record.collectionName;
    this._userInfo.id = record.id;
    this._userInfo.email = record.email;
    this._userInfo.name = record.name;
    this._userInfo.username = record.username;
    localStorage.setItem('User', JSON.stringify(this._userInfo))
    this.UserInfo.next(this._userInfo)
  }

  private redirectToHome(): void {
    this.router.navigate(['Home']);
  }

  isUserLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem("token") ? true : false;
  }

  isUserInfo(arg: any): arg is UserInfo {
    return arg && ((arg.avatar || arg.avatar === '') && typeof (arg.avatar) == 'string')
      && (arg.collectionName && typeof (arg.collectionName) == 'string')
      && (arg.id && typeof (arg.id) == 'string')
      && (arg.email && typeof (arg.email) == 'string')
      && ((arg.name || arg.name === '') && typeof (arg.name) == 'string')
      && (arg.username && typeof (arg.username) == 'string');
  }

  getUserInfo(): UserInfo {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("token") ? true : false) {
      let aux = JSON.parse(localStorage.getItem('User') || '{}');
      if (this.isUserInfo(aux)) {
        this._userInfo = aux ?? {} as UserInfo;
        return this._userInfo;
      }
    }
    return {} as UserInfo;
  }
}
