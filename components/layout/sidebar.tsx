'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const employeeLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/profile', label: 'My Profile', icon: '👤' },
    { href: '/dashboard/leave-request', label: 'Leave Request', icon: '📝' },
    { href: '/dashboard/attendance', label: 'Attendance', icon: '📅' },
    { href: '/dashboard/payslips', label: 'Payslips', icon: '💰' },
    { href: '/dashboard/announcements', label: 'Announcements', icon: '📢' },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/employees', label: 'Employees', icon: '👥' },
    { href: '/admin/leave-requests', label: 'Leave Requests', icon: '📋' },
    { href: '/admin/attendance', label: 'Attendance', icon: '📅' },
    { href: '/admin/payslips', label: 'Payslips', icon: '💼' },
    { href: '/admin/announcements', label: 'Announcements', icon: '📣' },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
            HR
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">HRIS</h1>
            <p className="text-xs text-sidebar-accent">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-accent">Logged in as</div>
        <div className="text-sm font-medium text-sidebar-foreground truncate">
          {user?.firstName} {user?.lastName}
        </div>
      </div>
    </aside>
  );
}
