'use client';

import { mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'On Leave'>('All');
  const [showNewEmployee, setShowNewEmployee] = useState(false);

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Records</h1>
          <p className="text-muted-foreground text-sm">Manage and view all employee information</p>
        </div>
        <Button onClick={() => setShowNewEmployee(!showNewEmployee)} className="bg-primary text-primary-foreground">
          {showNewEmployee ? 'Cancel' : '+ Add Employee'}
        </Button>
      </div>

      {/* New Employee Form */}
      {showNewEmployee && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add New Employee</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowNewEmployee(false);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" placeholder="Last Name" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Email" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="tel" placeholder="Phone" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" placeholder="Department" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" placeholder="Position" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="number" placeholder="Salary" className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowNewEmployee(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Create Employee
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>
      </div>

      {/* Employees Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Position</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {employee.firstName} {employee.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{employee.department}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{employee.position}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : employee.status === 'On Leave'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Employees</p>
          <p className="text-3xl font-bold text-foreground">{mockEmployees.length}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600">{mockEmployees.filter((e) => e.status === 'Active').length}</p>
        </Card>
        <Card className="p-6 border-0 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Inactive</p>
          <p className="text-3xl font-bold text-gray-600">{mockEmployees.filter((e) => e.status === 'Inactive').length}</p>
        </Card>
      </div>
    </div>
  );
}
