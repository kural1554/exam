import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import { User, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
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
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>
            </div>
        </div>
        <div className="hidden md:block relative">
             <Image 
                src="https://placehold.co/800x1200" 
                alt="Journey"
                fill
                className="object-cover"
                data-ai-hint="hiker mountain journey"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex flex-col justify-end p-12 text-white">
                 <div className="w-full max-w-md">
                     <p className="text-lg">Start planning your</p>
                    <h1 className="text-6xl font-bold leading-tight">Journey</h1>
                    <div className="mt-8 flex items-center gap-4">
                        <button className="h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </button>
                        <div>
                            <p className="font-semibold">Reaching the top</p>
                            <p className="text-sm">John Doe</p>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
