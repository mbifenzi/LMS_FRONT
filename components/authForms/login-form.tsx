"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// API response types
interface LoginResponse {
  status: string;
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    role: string;
    is_active: boolean;
  };
  session_id: string;
}

interface LoginErrorResponse {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      
      console.log('🔐 [LOGIN] Attempting login for:', data.email);
      console.log('🌐 [LOGIN] API URL:', `${API_BASE_URL}/auth/login`);
      
      const requestBody = {
        username_or_email: data.email,
        password: data.password,
      };
      
      console.log('📦 [LOGIN] Request body:', JSON.stringify(requestBody));
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(requestBody),
      });

      console.log('📡 [LOGIN] Response status:', response.status);

      if (response.ok) {
        const result: LoginResponse = await response.json();
        console.log('✅ [LOGIN] Login successful:', result);

        // Set the session_id cookie manually if needed
        if (result.session_id) {
          document.cookie = `session_id=${result.session_id}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          console.log('🍪 [LOGIN] Session cookie set');
        }

        toast.success("Login Successful", {
          description: `Welcome back, ${result.user.name}!`,
        });

        // Redirect to home page
        router.push("/");
      } else {
        console.log('❌ [LOGIN] Login failed with status:', response.status);
        
        if (response.status === 422) {
          const errorResult: LoginErrorResponse = await response.json();
          console.log('📋 [LOGIN] Validation errors:', errorResult);
          
          // Handle validation errors
          errorResult.detail.forEach((error) => {
            const field = error.loc[error.loc.length - 1] as keyof LoginFormData;
            if (field in form.getValues()) {
              form.setError(field, { message: error.msg });
            }
          });
        } else if (response.status === 401) {
          toast.error("Login Failed", {
            description: "Invalid email or password. Please try again.",
          });
        } else {
          toast.error("Login Failed", {
            description: "An unexpected error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error('❌ [LOGIN] Network error:', error);
      toast.error("Connection Error", {
        description: "Unable to connect to the server. Please check your internet connection.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link 
                    href="/forgot-password" 
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
