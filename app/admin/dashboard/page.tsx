'use client';

import { mockEmployees, mockLeaveRequests, mockAttendance, mockPayslips } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter((e) => e.status === 'Active').length;
  const pendingLeaves = mockLeaveRequests.filter((l) => l.status === 'Pending').length;
  const totalAttendanceRecords = mockAttendance.length;

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage employees, leave requests, and company records</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-foreground">{totalEmployees}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Employees</p>
              <p className="text-3xl font-bold text-foreground">{activeEmployees}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Leave Requests</p>
              <p className="text-3xl font-bold text-foreground">{pendingLeaves}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Attendance Records</p>
              <p className="text-3xl font-bold text-foreground">{totalAttendanceRecords}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/employees">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-xl">👤</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Manage Employees</h3>
                <p className="text-xs text-muted-foreground">View and edit employee records</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/leave-requests">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-xl">📋</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Approve Leave</h3>
                <p className="text-xs text-muted-foreground">{pendingLeaves} pending requests</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/attendance">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-xl">📅</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Track Attendance</h3>
                <p className="text-xs text-muted-foreground">Manage attendance records</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/payslips">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-xl">💼</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Manage Payslips</h3>
                <p className="text-xs text-muted-foreground">Upload and manage payslips</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/announcements">
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-xl">📣</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Announcements</h3>
                <p className="text-xs text-muted-foreground">Post company announcements</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Leave Requests</h2>
        <div className="space-y-3">
          {mockLeaveRequests.slice(0, 5).map((leave) => (
            <div key={leave.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {mockEmployees.find((e) => e.id === leave.employeeId)?.firstName}{' '}
                  {mockEmployees.find((e) => e.id === leave.employeeId)?.lastName} - {leave.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  leave.status === 'Approved'
                    ? 'bg-green-100 text-green-700'
                    : leave.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {leave.status}
              </span>
            </div>
          ))}
        </div>
        <Link href="/admin/leave-requests" className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          View All Requests
        </Link>
      </Card>
    </div>
  );
}
