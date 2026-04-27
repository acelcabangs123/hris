'use client';

import { useAuth } from '@/lib/auth-context';
import { mockEmployees, mockPayslips } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PayslipsPage() {
  const { user } = useAuth();
  const employee = mockEmployees.find((e) => e.userId === user?.id);
  const userPayslips = mockPayslips.filter((p) => p.employeeId === employee?.id);

  const totalEarnings = userPayslips.reduce((sum, p) => sum + (p.baseSalary + (p.bonus || 0)), 0);
  const totalDeductions = userPayslips.reduce((sum, p) => sum + p.deductions, 0);
  const totalNetSalary = userPayslips.reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payslips</h1>
        <p className="text-muted-foreground text-sm">View and download your salary payslips</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Total Gross Salary</p>
          <p className="text-3xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">{userPayslips.length} payslips</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Total Deductions</p>
          <p className="text-3xl font-bold text-red-600">${totalDeductions.toFixed(2)}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium mb-2">Total Net Salary</p>
          <p className="text-3xl font-bold text-green-600">${totalNetSalary.toFixed(2)}</p>
        </Card>
      </div>

      {/* Payslips List */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Payslip History</h2>
        </div>
        {userPayslips.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Month/Year</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Base Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Bonus</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {userPayslips.map((payslip) => (
                  <tr key={payslip.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {payslip.month} {payslip.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">${payslip.baseSalary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-foreground">${(payslip.bonus || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-red-600">${payslip.deductions.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">${payslip.netSalary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(payslip.uploadedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        📥 Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No payslips available yet</p>
          </div>
        )}
      </Card>

      {/* Payslip Details */}
      {userPayslips.length > 0 && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Latest Payslip Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium text-foreground">Base Salary</span>
                <span className="text-sm font-bold text-foreground">${userPayslips[0].baseSalary.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium text-foreground">Bonus</span>
                <span className="text-sm font-bold text-foreground">${(userPayslips[0].bonus || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium text-foreground">Deductions</span>
                <span className="text-sm font-bold text-red-600">-${userPayslips[0].deductions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-semibold text-foreground">Net Salary</span>
                <span className="text-lg font-bold text-primary">${userPayslips[0].netSalary.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
