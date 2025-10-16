'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  if (isSubmitted) {
    return (
      <div className={cn('flex flex-col gap-6', className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Check Your Email</h2>
          <p className="text-muted-foreground text-sm text-balance">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </p>
        </div>
        <div className="grid gap-6">
          <Button type="button" onClick={handleBackToLogin} className="w-full">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Forgot Password?</h2>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleBackToLogin}
          disabled={isLoading}
        >
          Back to Login
        </Button>
      </div>
    </form>
  );
}
