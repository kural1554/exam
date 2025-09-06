import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/Logo';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Image from 'next/image';
import PublicHeader from '@/components/layout/PublicHeader';
import Footer from '@/components/layout/Footer';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-background p-8 min-h-[calc(100vh-128px)]">
            <div className="w-full max-w-sm">
              <div className="text-center mb-8">
                <Link href="/" className="inline-block">
                  <Logo />
                </Link>
              </div>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Forgot Your Password?</CardTitle>
                  <CardDescription>
                    Enter your email and we'll send you a link to reset it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ForgotPasswordForm />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="hidden md:block relative min-h-[calc(100vh-128px)]">
            <Image
              src="https://placehold.co/800x1200"
              alt="Key and lock"
              fill
              className="object-cover"
              data-ai-hint="key lock security"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="w-full max-w-md">
                <h1 className="text-5xl font-bold leading-tight">
                  Regain Access Securely
                </h1>
                <p className="text-lg mt-4">
                  Follow the secure link we send to your email to set a new
                  password and get back to your learning journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
