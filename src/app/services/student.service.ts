import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);
  private jsonUrl = 'assets/data/students.json';

  getStudentsCount(): Observable<number> {
    return this.getStudentsData().pipe(map(students => students.length));
  }

  addStudent(student: any): Observable<any> {
    const storedData = localStorage.getItem('students');
    const students = storedData ? JSON.parse(storedData) : [];

    const deletedData = localStorage.getItem('deleted_emails');
    let deletedEmails: string[] = deletedData ? JSON.parse(deletedData) : [];
    deletedEmails = deletedEmails.filter(email => email !== student.email);
    localStorage.setItem('deleted_emails', JSON.stringify(deletedEmails));

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    return of(student);
  }

  getStudentsData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(jsonStudents => {
        const storedData = localStorage.getItem('students');
        const localStudents = storedData ? JSON.parse(storedData) : [];

        const deletedData = localStorage.getItem('deleted_emails');
        const deletedEmails: string[] = deletedData ? JSON.parse(deletedData) : [];

        const allStudents = [...jsonStudents, ...localStudents];

        return allStudents.filter(student => !deletedEmails.includes(student.email));
      })
    );
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
