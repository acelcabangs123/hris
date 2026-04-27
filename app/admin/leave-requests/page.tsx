'use client';

import { mockLeaveRequests, mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminLeaveRequestsPage() {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const filteredRequests = mockLeaveRequests.filter((request) => filterStatus === 'All' || request.status === filterStatus);

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

  const pendingCount = mockLeaveRequests.filter((r) => r.status === 'Pending').length;
  const approvedCount = mockLeaveRequests.filter((r) => r.status === 'Approved').length;
  const rejectedCount = mockLeaveRequests.filter((r) => r.status === 'Rejected').length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leave Request Management</h1>
        <p className="text-muted-foreground text-sm">Review and approve employee leave requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus('Pending')}>
          <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus('Approved')}>
          <p className="text-sm text-muted-foreground mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus('Rejected')}>
          <p className="text-sm text-muted-foreground mb-1">Rejected</p>
          <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Requests Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => {
                const employee = mockEmployees.find((e) => e.id === request.employeeId);
                return (
                  <tr key={request.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {employee?.firstName[0]}
                            {employee?.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {employee?.firstName} {employee?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{employee?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{request.type}</td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{request.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-xs text-red-600 border-red-200">
                            Reject
                          </Button>
                        </div>
                      )}
                      {request.status !== 'Pending' && (
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Request Details Modal */}
      {selectedRequest && (
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Request Details</h2>
            <button onClick={() => setSelectedRequest(null)} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Leave Type</p>
                <p className="text-foreground font-medium">{selectedRequest.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="text-foreground font-medium">{selectedRequest.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                <p className="text-foreground font-medium">{new Date(selectedRequest.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">End Date</p>
                <p className="text-foreground font-medium">{new Date(selectedRequest.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reason</p>
              <p className="text-foreground">{selectedRequest.reason}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
