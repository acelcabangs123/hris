'use client';

import { useAuth } from '@/lib/auth-context';
import { mockLeaveRequests, mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function LeaveRequestPage() {
  const { user } = useAuth();
  const employee = mockEmployees.find((e) => e.userId === user?.id);
  const userLeaves = mockLeaveRequests.filter((l) => l.employeeId === employee?.id);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Vacation' as const,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setFormData({ type: 'Vacation', startDate: '', endDate: '', reason: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-muted-foreground text-sm">Manage your leave and view request history</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground">
          {showForm ? 'Cancel' : 'Request Leave'}
        </Button>
      </div>

      {/* New Leave Form */}
      {showForm && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">New Leave Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Leave Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Vacation</option>
                  <option>Sick</option>
                  <option>Personal</option>
                  <option>Maternity</option>
                  <option>Paternity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Number of Days</label>
                <Input
                  type="number"
                  placeholder="5"
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="h-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Reason for Leave</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Please provide the reason for your leave request..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Submit Request
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Requests List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
          <p className="text-3xl font-bold text-foreground">{userLeaves.length}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{userLeaves.filter((l) => l.status === 'Approved').length}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{userLeaves.filter((l) => l.status === 'Pending').length}</p>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Request History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {userLeaves.map((leave) => (
                <tr key={leave.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      {leave.type === 'Vacation' && '🏖️'}
                      {leave.type === 'Sick' && '🏥'}
                      {leave.type === 'Personal' && '📌'}
                      {leave.type === 'Maternity' && '👶'}
                      {leave.type === 'Paternity' && '👨‍👧'}
                      {leave.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(leave.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
