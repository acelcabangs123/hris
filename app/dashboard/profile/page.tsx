'use client';

import { useAuth } from '@/lib/auth-context';
import { mockEmployees } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const employee = mockEmployees.find((e) => e.userId === user?.id);
  const [isEditing, setIsEditing] = useState(false);

  if (!employee) {
    return <div className="p-8">Employee not found</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6 border-0 shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{employee.firstName} {employee.lastName}</h2>
          <p className="text-muted-foreground text-sm mb-4">{employee.position}</p>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold text-green-600">{employee.status}</p>
            </div>
            <div className="px-3 py-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Employment Type</p>
              <p className="text-sm font-semibold text-foreground">{employee.employmentType}</p>
            </div>
          </div>
        </Card>

        {/* Details */}
        <Card className="lg:col-span-2 p-6 border-0 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  defaultValue={employee.email}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-foreground">{employee.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  defaultValue={employee.phone}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-foreground">{employee.phone}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Department</label>
              <p className="text-foreground">{employee.department}</p>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Position</label>
              <p className="text-foreground">{employee.position}</p>
            </div>

            {/* Join Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Join Date</label>
              <p className="text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</p>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Annual Salary</label>
              <p className="text-foreground">${employee.salary.toLocaleString()}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Additional Info */}
          <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Employee ID</p>
              <p className="font-mono text-sm text-foreground">{employee.id}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Years of Service</p>
              <p className="text-sm font-semibold text-foreground">
                {Math.floor((new Date().getTime() - new Date(employee.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
