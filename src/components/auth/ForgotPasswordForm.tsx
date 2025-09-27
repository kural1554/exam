
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { requestPasswordReset } from '@/services/api';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  
  
async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
        // Namma API function ah call panrom
        const response = await requestPasswordReset(values.email);

        if (response.ok) {
            // Success!
            toast({
                title: 'Password Reset Link Sent',
                description: 'If an account with that email exists, a reset link has been sent.',
            });
            setIsSubmitted(true); // Success aana, success message ah kaatrom
        } else {
            // Backend la irunthu error vandha
            const errorData = await response.json();
            toast({
                title: "Request Failed",
                description: errorData.detail || "Could not process your request. Please try again.",
                variant: "destructive",
            });
        }

    } catch (error) {
        // Network error
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem connecting to the server.",
            variant: "destructive",
        });
        console.error("Forgot password error:", error);
    } finally {
        setIsLoading(false);
    }
  }

  // Intha `isSubmitted` logic romba nallathu, atha apdiye vechikalam
  if (isSubmitted) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          A password reset link has been sent to your email address. Please
          check your inbox.
        </p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
