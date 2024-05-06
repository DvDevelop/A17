import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthInfo, SingUpInfo, UserInfo, Session } from '../dataTypes/auth-info';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Observable, forkJoin, mergeMap, map, switchMap, identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly _http = inject(HttpClient);
  private readonly _pb = environment.API_BASE_URL;
  private readonly _authSvs = inject(AuthService);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor() {}
  private handleLogin(res:any):void{
    let aux = {} as Session;
      aux.token = res.token;
      aux.user = {} as UserInfo;
      aux.user.avatar = res.record.avatar;
      aux.user.collectionName = res.record.collectionName;
      aux.user.email = res.record.email;
      aux.user.id = res.record.id;
      aux.user.name = res.record.name;
      aux.user.username = res.record.username;
      this._authSvs.setSession(aux)
  }

  private logIn$(info:AuthInfo):Observable<any>{
    return this._http.post<any>(this._pb + 'api/collections/users/auth-with-password',info,this.httpOptions)
  }

  singUp$(info:SingUpInfo):Observable<any>{
    return this._http.post<UserInfo>(this._pb + 'api/collections/users/records',info,this.httpOptions)
  }

  askforLogin(info:AuthInfo):void{
    this.logIn$(info).subscribe(res =>{
      this.handleLogin(res)
    })
  }
  
  singUp(info:SingUpInfo):void{
    this.singUp$(info).pipe(
      switchMap((resp) =>{
        let loginInfo = {
          identity : info.username,
          password : info.password
        } as AuthInfo
        return this.logIn$(loginInfo);
      })
    ).subscribe(resp => {
      this.handleLogin(resp)
    })
  }
}
