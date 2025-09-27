
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
import { useParams,useRouter } from 'next/navigation';

import { confirmPasswordReset } from '@/services/api';

const formSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"], // Set the path of the error to 'password2' field
});


export default function ResetPasswordForm() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password2: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // URL la irunthu uid and token ah edukurom
    const uid = params.uid as string;
    const token = params.token as string;

    if (!uid || !token) {
        toast({ title: "Error", description: "Invalid reset link.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
        const payload = {
            password: values.password,
            password2: values.password2,
            uidb64: uid,
            token: token,
        };

        const response = await confirmPasswordReset(payload);
        
        if (response.ok) {
            toast({
                title: 'Password Changed Successfully',
                description: 'Redirecting to login...',
            });
            setIsSubmitted(true);
            setTimeout(() => router.push('/login'), 2000); // 2 seconds kalichi login page ku pogum
        } else {
            const errorData = await response.json();
            toast({
                title: 'Reset Failed',
                description: errorData.detail || "Invalid or expired link.",
                variant: "destructive",
            });
        }

    } catch (error) {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem connecting to the server.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  // Intha `isSubmitted` logic apdiye irukatum
  if (isSubmitted) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          Your password has been successfully reset.
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Change Password
        </Button>
      </form>
    </Form>
  );
}
