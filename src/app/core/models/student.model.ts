export interface Student {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string; // "YYYY-MM-DD" for Bootstrap Date picker
  gender: 'Male' | 'Female' | 'Other';
  course: 'CSE' | 'IT' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  termsAccepted: boolean;
}