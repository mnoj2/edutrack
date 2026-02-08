import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, throwError } from 'rxjs';

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
    const emailToAdd = student.email.trim().toLowerCase();

    return this.getStudentsData().pipe(
      switchMap(students => {
        const emailExists = students.some(s => s.email.trim().toLowerCase() === emailToAdd);
        if (emailExists) {
          return throwError(() => new Error('Email already exists'));
        }

        const storedData = localStorage.getItem('students');
        const localStudents: any[] = storedData ? JSON.parse(storedData) : [];

        // Final safe check against latest local storage state
        if (localStudents.some(s => s.email.trim().toLowerCase() === emailToAdd)) {
          return throwError(() => new Error('Email already exists'));
        }

        const deletedData = localStorage.getItem('deleted_emails');
        let deletedEmails: string[] = deletedData ? JSON.parse(deletedData) : [];
        deletedEmails = deletedEmails.filter(email => email.trim().toLowerCase() !== emailToAdd);
        localStorage.setItem('deleted_emails', JSON.stringify(deletedEmails));

        localStudents.push({ ...student, email: student.email.trim() });
        localStorage.setItem('students', JSON.stringify(localStudents));

        return of(student);
      })
    );
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
