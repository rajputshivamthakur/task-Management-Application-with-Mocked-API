'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register, clearError } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Lock, User, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Account created successfully!', {
        description: 'Welcome to Task Manager. You can now start managing your tasks.',
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
    setValidationError('');
    
    // Validate password match
    if (credentials.password !== credentials.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    // Validate password length
    if (credentials.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    
    const result = await dispatch(register({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    }));
    
    if (register.rejected.match(result)) {
      toast.error('Registration failed', {
        description: result.payload as string || 'Unable to create account. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Sign up to start managing your tasks
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
                  placeholder="Choose a username"
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
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
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
                  placeholder="Create a password (min 6 characters)"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={credentials.confirmPassword}
                  onChange={(e) =>
                    setCredentials({ ...credentials, confirmPassword: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {(validationError || error) && (
              <Alert variant="destructive">
                <AlertDescription>{validationError || error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href="/login" className="transition-colors duration-300">
                Sign In Instead
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
