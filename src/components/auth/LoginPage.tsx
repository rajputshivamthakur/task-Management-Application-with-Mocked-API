'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      });
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(credentials));
    if (login.rejected.match(result)) {
      toast.error('Login failed', {
        description: result.payload as string || 'Invalid credentials. Please try again.',
      });
    }
  };

  const handleDemoLogin = () => {
    setCredentials({ username: 'test', password: 'test123' });
    setTimeout(() => {
      dispatch(login({ username: 'test', password: 'test123' }));
    }, 100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your task dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Don't have an account?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href="/register" className="transition-colors duration-300">
                Create Account
              </Link>
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 p-4 rounded-lg space-y-2 transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md">
              <p className="text-sm text-foreground text-center font-medium">
                <strong className="text-purple-700 dark:text-purple-300">Username:</strong> <span className="font-mono">test</span>
              </p>
              <p className="text-sm text-foreground text-center font-medium">
                <strong className="text-purple-700 dark:text-purple-300">Password:</strong> <span className="font-mono">test123</span>
              </p>
              <Button
                type="button"
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={handleDemoLogin}
                disabled={loading}
              >
                Use Demo Credentials
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}