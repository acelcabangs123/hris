'use client';

import { useAuth } from '@/lib/auth-context';
import { mockEmployees, mockAttendance } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

export default function AttendancePage() {
  const { user } = useAuth();
  const employee = mockEmployees.find((e) => e.userId === user?.id);
  const userAttendance = mockAttendance.filter((a) => a.employeeId === employee?.id);

  const presentDays = userAttendance.filter((a) => a.status === 'Present').length;
  const absentDays = userAttendance.filter((a) => a.status === 'Absent').length;
  const lateDays = userAttendance.filter((a) => a.status === 'Late').length;
  const totalDays = userAttendance.length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Get current month's data
  const currentMonthDays = userAttendance.filter((a) => {
    const date = new Date(a.date);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance Summary</h1>
        <p className="text-muted-foreground text-sm">View your attendance records and statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Total Days</p>
          <p className="text-3xl font-bold text-foreground">{totalDays}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Present</p>
          <p className="text-3xl font-bold text-green-600">{presentDays}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Absent</p>
          <p className="text-3xl font-bold text-red-600">{absentDays}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Late</p>
          <p className="text-3xl font-bold text-yellow-600">{lateDays}</p>
        </Card>
      </div>

      {/* Attendance Rate */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Overall Attendance Rate</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Attendance Percentage</span>
              <span className="text-2xl font-bold text-primary">{attendancePercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${attendancePercentage}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Present Days</p>
            <p className="text-3xl font-bold text-green-600">{presentDays}</p>
            <p className="text-xs text-muted-foreground mt-2">{((presentDays / totalDays) * 100).toFixed(1)}% of total</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Absent Days</p>
            <p className="text-3xl font-bold text-red-600">{absentDays}</p>
            <p className="text-xs text-muted-foreground mt-2">{((absentDays / totalDays) * 100).toFixed(1)}% of total</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Late Days</p>
            <p className="text-3xl font-bold text-yellow-600">{lateDays}</p>
            <p className="text-xs text-muted-foreground mt-2">{((lateDays / totalDays) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      </Card>

      {/* Attendance Calendar */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Attendance Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Duration</th>
              </tr>
            </thead>
            <tbody>
              {userAttendance.map((record) => {
                const duration = record.checkIn && record.checkOut ? '8h 30m' : '-';
                const statusColor =
                  record.status === 'Present'
                    ? 'bg-green-100 text-green-700'
                    : record.status === 'Late'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700';

                return (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{record.checkIn || '-'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Calendar View Legend */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Legend</h2>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-green-600" />
            <span className="text-sm text-foreground">Present</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-yellow-600" />
            <span className="text-sm text-foreground">Late</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-red-600" />
            <span className="text-sm text-foreground">Absent</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
