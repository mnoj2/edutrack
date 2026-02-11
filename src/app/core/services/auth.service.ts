import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  private userSource = new BehaviorSubject<string>('Admin');
  currentUser = this.userSource.asObservable();

  private _isFirstLogin = true;

  public isLogged: boolean = localStorage.getItem('isLogged') === 'true';

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  isLoggedIn(): boolean { 
    return this.isLogged;
  }  

  logout(): void {
    localStorage.removeItem('isLogged');
  }

  changeUser(name: string) {
    this.userSource.next(name);
  }

  get isFirstLogin() {
    return this._isFirstLogin;
  }

  setFirstLogin(value: boolean) {
    this._isFirstLogin = value;
  }

}
