import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import LoginForm from "@/components/auth/LoginForm";
import PublicHeader from "@/components/layout/PublicHeader";
import Image from "next/image";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-background p-8">
            <div className="w-full max-w-sm">
                <div className="mb-8">
                    <Logo />
                </div>
                <div className="relative mb-4">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" placeholder="Your login or e-mail" className="pl-10 h-12"/>
                </div>
                <div className="relative mb-4">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Password" className="pl-10 h-12"/>
                </div>
                <div className="flex justify-between items-center mb-6 text-sm">
                    <Link href="/signup" className="text-primary hover:underline">
                        Register
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <Button className="w-full h-12 text-base">Sign In</Button>
                 <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Login with</span>
                    <div className="flex justify-center gap-4 mt-2">
                        <Link href="#" className="text-primary hover:underline">facebook</Link>
                        <Link href="#" className="text-primary hover:underline">twitter</Link>
                        <Link href="#" className="text-primary hover:underline">google</Link>
                    </div>
                </div>
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
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex flex-col justify-between p-12 text-white">
                <div className="self-end">
                    <button className="p-2 rounded-full bg-black/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                </div>
                 <div className="w-full max-w-md">
                     <p className="text-lg">Start planning your</p>
                    <h1 className="text-6xl font-bold leading-tight">Journey</h1>
                    <div className="mt-8 flex items-center gap-4">
                        <button className="h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
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
