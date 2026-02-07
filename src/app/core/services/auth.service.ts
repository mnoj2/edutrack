import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private jsonUrl = 'assets/data/users.json';

  public isLogged: boolean = localStorage.getItem('isLogged') === 'true';

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(users => {
        const user = users.find(user_ => user_.username === username && user_.password === password);
        if(user) {
          localStorage.setItem('isLogged', 'true');
          return true;
        }
        return false;
      })
    )
  }

  isLoggedIn(): boolean { 
    return this.isLogged;
  }  

  logout(): void {
    localStorage.removeItem('isLogged');
  }

}
