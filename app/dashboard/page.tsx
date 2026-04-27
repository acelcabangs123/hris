'use client';

import { useAuth } from '@/lib/auth-context';
import { mockEmployees, mockLeaveRequests, mockAttendance, mockPayslips } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  const employee = mockEmployees.find((e) => e.userId === user?.id);
  const userLeaves = mockLeaveRequests.filter((l) => l.employeeId === employee?.id);
  const userAttendance = mockAttendance.filter((a) => a.employeeId === employee?.id);
  const userPayslips = mockPayslips.filter((p) => p.employeeId === employee?.id);

  const pendingLeaves = userLeaves.filter((l) => l.status === 'Pending').length;
  const approvedLeaves = userLeaves.filter((l) => l.status === 'Approved').length;
  const presentDays = userAttendance.filter((a) => a.status === 'Present').length;
  const absentDays = userAttendance.filter((a) => a.status === 'Absent').length;
  const lateDays = userAttendance.filter((a) => a.status === 'Late').length;

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {employee?.firstName}!</h1>
        <p className="text-muted-foreground">{employee?.position} at {employee?.department}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Leave Requests */}
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Requests</p>
              <p className="text-3xl font-bold text-foreground">{pendingLeaves}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </Card>

        {/* Approved Leaves */}
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Approved Leaves</p>
              <p className="text-3xl font-bold text-foreground">{approvedLeaves}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </Card>

        {/* Present Days */}
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Present Days</p>
              <p className="text-3xl font-bold text-foreground">{presentDays}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
          </div>
        </Card>

        {/* Payslips Available */}
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Payslips</p>
              <p className="text-3xl font-bold text-foreground">{userPayslips.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Summary */}
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Present</span>
              <span className="text-lg font-bold text-green-600">{presentDays}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Absent</span>
              <span className="text-lg font-bold text-red-600">{absentDays}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Late</span>
              <span className="text-lg font-bold text-yellow-600">{lateDays}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Attendance Rate</span>
                <span className="text-sm font-bold text-primary">
                  {Math.round((presentDays / (presentDays + absentDays + lateDays)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{
                    width: `${Math.round((presentDays / (presentDays + absentDays + lateDays)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/attendance"
            className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View Full Attendance
          </Link>
        </Card>

        {/* Recent Payslips */}
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Payslips</h2>
          <div className="space-y-2">
            {userPayslips.slice(0, 3).map((payslip) => (
              <div key={payslip.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {payslip.month} {payslip.year}
                  </p>
                  <p className="text-xs text-muted-foreground">Net: ${payslip.netSalary.toFixed(2)}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/payslips"
            className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View All Payslips
          </Link>
        </Card>
      </div>
    </div>
  );
}
