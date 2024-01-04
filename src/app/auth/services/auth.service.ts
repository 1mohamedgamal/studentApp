import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  onLogin(data: any): Observable<any> {
    return this._HttpClient.post('User/Login', data);
  }

  onRegister(data: any): Observable<any> {
    return this._HttpClient.post('User/POST', data);
  }
  onLogOut(data: any): Observable<any> {
    return this._HttpClient.post('User/LogOut', data);
  }
}
