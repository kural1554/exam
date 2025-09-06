
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-background p-8 min-h-[calc(100vh-128px)]">
              <div className="w-full max-w-2xl">
                  <div className="text-center mb-8">
                      <Link href="/" className="inline-block">
                          <Logo />
                      </Link>
                  </div>
                  <Card>
                    <CardHeader className="text-center p-6">
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
          <div className="hidden md:block relative min-h-[calc(100vh-128px)]">
              <Image 
                  src="https://placehold.co/800x1200" 
                  alt="Learning Journey"
                  fill
                  className="object-cover"
                  data-ai-hint="students learning library"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex flex-col justify-end p-12 text-white">
                  <div className="w-full max-w-md">
                      <h1 className="text-5xl font-bold leading-tight">Begin Your Success Story</h1>
                      <p className="text-lg mt-4">Join a community of learners and achievers. Your path to excellence starts here.</p>
                  </div>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
