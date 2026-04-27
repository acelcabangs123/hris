'use client';

import { mockPayslips, mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminPayslipsPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const totalPayslips = mockPayslips.length;
  const totalProcessed = mockPayslips.filter((p) => p.fileUrl).length;
  const pendingPayslips = totalPayslips - totalProcessed;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payslip Management</h1>
          <p className="text-muted-foreground text-sm">Upload and manage employee payslips</p>
        </div>
        <Button onClick={() => setShowUpload(!showUpload)} className="bg-primary text-primary-foreground">
          {showUpload ? 'Cancel' : '📤 Upload Payslip'}
        </Button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upload Payslip</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowUpload(false);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Employee</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Employee</option>
                  {mockEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Month/Year</label>
                <input
                  type="month"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Base Salary</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bonus (Optional)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deductions</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Upload PDF</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input type="file" accept=".pdf" className="hidden" />
                <p className="text-muted-foreground mb-2">Drag and drop PDF or click to browse</p>
                <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowUpload(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Upload Payslip
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Payslips</p>
          <p className="text-3xl font-bold text-foreground">{totalPayslips}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Uploaded</p>
          <p className="text-3xl font-bold text-green-600">{totalProcessed}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingPayslips}</p>
        </Card>
      </div>

      {/* Payslips Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Payslip Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Month/Year</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Base Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Bonus</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPayslips.map((payslip) => {
                const employee = mockEmployees.find((e) => e.id === payslip.employeeId);
                return (
                  <tr key={payslip.id} className="border-b border-border hover:bg-muted/50 transition-colors">
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
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {payslip.month} {payslip.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">${payslip.baseSalary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-foreground">${(payslip.bonus || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-red-600">-${payslip.deductions.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">${payslip.netSalary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(payslip.uploadedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          📄 View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs text-red-600">
                          Delete
                        </Button>
                      </div>
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
