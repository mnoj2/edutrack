export interface Student {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  course: 'CSE' | 'IT' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  termsAccepted: boolean;
}