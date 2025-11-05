import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/configure');
    }
  }, [isAuthenticated, navigate]);

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignIn = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      navigate('/configure');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await signUp(data.firstName, data.lastName, data.email, data.password);
      toast({
        title: 'Account created!',
        description: 'Your account has been created successfully.',
      });
      navigate('/configure');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-8 border border-border/50">
        <Logo />
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {isSignUp ? 'Welcome to Stackguard' : 'Welcome back to Stackguard'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Secure your codebase with advanced secret scanning features and protection
          </p>
        </div>

        {!isSignUp ? (
          <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
            <div>
              <Label htmlFor="email">Enter email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email ID"
                {...signInForm.register('email')}
                className="mt-1"
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{signInForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Enter password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...signInForm.register('password')}
                className="mt-1"
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">{signInForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>

            <p className="text-sm text-center">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Enter first name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  {...signUpForm.register('firstName')}
                  className="mt-1"
                />
                {signUpForm.formState.errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{signUpForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Enter last name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  {...signUpForm.register('lastName')}
                  className="mt-1"
                />
                {signUpForm.formState.errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{signUpForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="signup-email">Enter email ID</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter email ID"
                {...signUpForm.register('email')}
                className="mt-1"
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{signUpForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="signup-password">Enter password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Enter password"
                {...signUpForm.register('password')}
                className="mt-1"
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">{signUpForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...signUpForm.register('confirmPassword')}
                className="mt-1"
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{signUpForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>

            <p className="text-sm text-center">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
