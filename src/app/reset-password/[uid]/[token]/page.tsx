
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/Logo';
import Image from 'next/image';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-background p-8">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Logo />
              </Link>
            </div>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                <CardDescription>
                  Enter and confirm your new password below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResetPasswordForm />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="hidden md:block relative">
          <Image
            src="https://placehold.co/800x1200"
            alt="Secure door"
            fill
            className="object-cover"
            data-ai-hint="secure vault door"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="w-full max-w-md">
              <h1 className="text-5xl font-bold leading-tight">
                Secure Your Account
              </h1>
              <p className="text-lg mt-4">
                Create a new, strong password to keep your account safe and
                continue your progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
