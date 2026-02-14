import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  addStudent(student: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/student`, student);
  }

  getStudentsData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student`);
  }

  getStudentsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/student/count`);
  }

  deleteStudent(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/student/${email}`);
  }

}
