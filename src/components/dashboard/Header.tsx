'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Moon, Sun, LogOut, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully', {
      description: 'You have been logged out. See you soon!',
    });
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Task Manager</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.username}!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-red-700 text-red-700 hover:bg-red-600 hover:text-white hover:border-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900 dark:hover:text-red-100 dark:hover:border-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
