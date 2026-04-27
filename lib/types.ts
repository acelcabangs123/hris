export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive' | 'On Leave';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'Sick' | 'Vacation' | 'Personal' | 'Maternity' | 'Paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  checkIn?: string;
  checkOut?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  bonus?: number;
  deductions: number;
  netSalary: number;
  uploadedDate: string;
  fileUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedBy: string;
  postedDate: string;
  updatedDate?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
