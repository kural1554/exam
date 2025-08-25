import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import SignupForm from "@/components/auth/SignupForm";
import PublicHeader from "@/components/layout/PublicHeader";

export default function SignupPage() {
  return (
    <>
    <PublicHeader />
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <Link href="/" className="inline-block">
                <Logo />
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Start your learning journey with Examplify.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
