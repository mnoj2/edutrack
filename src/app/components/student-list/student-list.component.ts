import { Component, inject, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { StudentService } from 'src/app/services/student.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  private studentService = inject(StudentService);
  private toast = inject(HotToastService);
  private zone = inject(NgZone);
  private destroy$ = new Subject<void>();

  rowData: any[] = [];
  selectedStudent: any = null;
  isModalOpen = false;

  isDeleteModalOpen = false;
  studentToDeleteEmail: string = '';

  columnDefs: ColDef[] = [
    { field: 'fullName', headerName: 'Name', filter: true, flex: 2 },
    { field: 'email', headerName: 'Email', filter: true, flex: 2 },
    { field: 'course', headerName: 'Course', filter: true, flex: 1 },
    { field: 'gender', headerName: 'Gender', filter: true, flex: 1 },
    {
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      cellRenderer: (params: any) => {
        const div = document.createElement('div');
        div.className = 'd-flex gap-2 align-items-center h-100';

        const viewBtn = document.createElement('button');
        viewBtn.innerHTML = '<i class="bx bx-show"></i>';
        viewBtn.className = 'btn-action btn-view';
        viewBtn.onclick = () => this.zone.run(() => this.onViewStudent(params.data));

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';
        deleteBtn.className = 'btn-action btn-delete';
        deleteBtn.onclick = () => this.zone.run(() => this.onDeleteStudent(params.data.email));

        div.appendChild(viewBtn);
        div.appendChild(deleteBtn);
        return div;
      }
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    resizable: true
  };

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudentsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.rowData = data;
        },
        error: () => this.toast.error('Failed to load students')
      });
  }

  onViewStudent(student: any) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  onDeleteStudent(email: string) {
    this.studentToDeleteEmail = email;
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    if (this.studentToDeleteEmail) {
      this.studentService.deleteStudent(this.studentToDeleteEmail)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toast.success('Student deleted successfully');
            this.loadStudents();
            this.closeDeleteModal(); // Closes on success
          },
          error: (err) => {
            this.toast.error('Delete failed');
            // Decide if you want to close it even if it fails:
            // this.closeDeleteModal(); 
          }
        });
    }
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.studentToDeleteEmail = '';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
