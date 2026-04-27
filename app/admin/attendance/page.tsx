'use client';

import { mockAttendance, mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminAttendancePage() {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const presentCount = mockAttendance.filter((a) => a.status === 'Present').length;
  const absentCount = mockAttendance.filter((a) => a.status === 'Absent').length;
  const lateCount = mockAttendance.filter((a) => a.status === 'Late').length;
  const totalRecords = mockAttendance.length;

  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground text-sm">Track and manage employee attendance</p>
        </div>
        <Button onClick={() => setShowBulkUpload(!showBulkUpload)} className="bg-primary text-primary-foreground">
          {showBulkUpload ? 'Cancel' : '📤 Bulk Upload'}
        </Button>
      </div>

      {/* Bulk Upload Form */}
      {showBulkUpload && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Bulk Upload Attendance</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowBulkUpload(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Upload CSV File</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input type="file" accept=".csv" className="hidden" />
                <p className="text-muted-foreground mb-2">Drag and drop your CSV file or click to browse</p>
                <p className="text-xs text-muted-foreground">Format: Employee ID, Date, Status (Present/Absent/Late)</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowBulkUpload(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Upload Attendance
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Records</p>
          <p className="text-3xl font-bold text-foreground">{totalRecords}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Present</p>
          <p className="text-3xl font-bold text-green-600">{presentCount}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Absent</p>
          <p className="text-3xl font-bold text-red-600">{absentCount}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Late</p>
          <p className="text-3xl font-bold text-yellow-600">{lateCount}</p>
        </Card>
      </div>

      {/* Attendance Rate */}
      <Card className="p-6 border-0 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Overall Attendance Rate</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Current Rate</span>
              <span className="text-3xl font-bold text-primary">{attendanceRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div className="bg-primary rounded-full h-4 transition-all" style={{ width: `${attendanceRate}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Date Filter */}
      <div className="flex gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Attendance Records Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Attendance Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendance.map((record) => {
                const employee = mockEmployees.find((e) => e.id === record.employeeId);
                const statusColor =
                  record.status === 'Present'
                    ? 'bg-green-100 text-green-700'
                    : record.status === 'Late'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700';

                return (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {employee?.firstName[0]}
                            {employee?.lastName[0]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {employee?.firstName} {employee?.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{employee?.department}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>{record.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{record.checkIn || '-'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
