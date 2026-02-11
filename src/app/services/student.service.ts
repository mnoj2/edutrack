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

  private jsonUrl = 'assets/data/students.json';

  getStudentsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/student/count`);
  }

  addStudent(student: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/student/student`, student);
  }

  getStudentsData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/students`);
  }

  deleteStudent(email: string): Observable<any> {
    const deletedData = localStorage.getItem('deleted_emails');
    const deletedEmails: string[] = deletedData ? JSON.parse(deletedData) : [];

    if (!deletedEmails.includes(email)) {
      deletedEmails.push(email);
      localStorage.setItem('deleted_emails', JSON.stringify(deletedEmails));
    }

    const storedData = localStorage.getItem('students');
    let students = storedData ? JSON.parse(storedData) : [];
    students = students.filter((s: any) => s.email !== email);
    localStorage.setItem('students', JSON.stringify(students));

    return of({ success: true });
  }

}
