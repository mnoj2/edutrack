import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private http = inject(HttpClient);
    private jsonUrl = 'assets/data/students.json';

  getStudentsCount(): Observable<number> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(users => users.length)
    );
  }

  getStudentsData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

}
