
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="relative flex w-full max-w-6xl m-4 h-auto lg:h-[800px] overflow-hidden rounded-2xl shadow-2xl bg-card">
        {/* Left side with illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-primary-dark p-12">
            <div className="text-white text-center">
                <h1 className="text-4xl font-bold mb-4">Begin Your Success Story</h1>
                <p className="text-lg text-primary-foreground/80 mb-8">Join a community of learners and achievers. Your path to excellence starts here.</p>
                <div className="relative w-full h-96">
                    <Image
                    src="https://i.pinimg.com/564x/82/e7/28/82e7287b91acb66d6f024e07c98845b1.jpg"
                    alt="Illustration of a person with leaves"
                    fill
                    className="object-contain"
                    data-ai-hint="woman leaves abstract"
                    />
                </div>
            </div>
        </div>

        {/* Right side with the form */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center bg-card overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Create an Account</h1>
            <SignupForm />
             <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline text-primary">
                Log in
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
