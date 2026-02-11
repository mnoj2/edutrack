import { Component, inject, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-reg',
  templateUrl: './student-reg.component.html',
  styleUrls: ['./student-reg.component.scss']
})
export class StudentRegComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private studentService = inject(StudentService);
  private toast = inject(HotToastService);
  isSubmitting = false;

  studentForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('2005-01-01', Validators.required),
    course: new FormControl('', Validators.required),
    termsAccepted: new FormControl(false, Validators.requiredTrue)
  });

  onSubmit() {
    if (this.studentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = {
        ...this.studentForm.value, mobileNumber: this.studentForm.value.mobileNumber?.toString() || ''
      };
      this.studentService.addStudent(formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toast.success('Student Registered Successfully!');
            this.studentForm.reset({ gender: '', termsAccepted: false, dateOfBirth: '2005-01-01' });
            this.isSubmitting = false;
          },
          error: (err) => {
            this.isSubmitting = false;
            if (err.status === 401) {
              this.toast.error('Email already exists!');
            } else {
              this.toast.error('Registration Failed');
            }
          }
        });
    } else if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}