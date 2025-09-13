

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="relative flex w-full max-w-4xl m-4 h-[600px] overflow-hidden rounded-2xl shadow-2xl bg-card">
        {/* Left side with illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-primary-dark p-12">
            <div className="relative w-full h-full">
                <Image
                src="https://i.pinimg.com/564x/82/e7/28/82e7287b91acb66d6f024e07c98845b1.jpg"
                alt="Illustration of a person with leaves"
                fill
                className="object-contain"
                data-ai-hint="woman leaves abstract"
                />
            </div>
        </div>

        {/* Right side with the form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-card">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Log In</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
