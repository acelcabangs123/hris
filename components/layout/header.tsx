'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 relative">
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'Employee Portal'}
        </h1>
        <p className="text-xs text-muted-foreground">Welcome back, {user?.firstName}!</p>
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.firstName}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <Card className="absolute right-0 mt-2 w-48 shadow-lg border z-50">
            <div className="p-4 space-y-3">
              <div className="border-b border-border pb-3">
                <p className="text-sm font-medium text-foreground">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              {user?.role === 'employee' && (
                <>
                  <a
                    href="/dashboard/profile"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Profile
                  </a>
                </>
              )}

              <Button variant="outline" className="w-full text-sm h-9" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </Card>
        )}
      </div>
    </header>
  );
}
