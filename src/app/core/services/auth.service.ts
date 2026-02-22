import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private userSource = new BehaviorSubject<string>('Admin');
  currentUser = this.userSource.asObservable();
  private _isFirstLogin = true;

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  private readonly USER_ID = 'user_id';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        if (response && response.accessToken) {
          this.saveTokens(response.accessToken, response.refreshToken, response.userId);
          this.changeUser(data.username);
        }
      })
    );
  }

  private saveTokens(accessToken: string, refreshToken: string, userId: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(this.USER_ID, userId);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    const userId = localStorage.getItem(this.USER_ID);
    
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, { userId, refreshToken }).pipe(
      tap(response => {
        if (response && response.accessToken) {
          this.saveTokens(response.accessToken, response.refreshToken, response.userId);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }
  
  isLoggedIn(): boolean { 
    return !!this.getToken();
  }  

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem('username');
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
