

'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '../Logo';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';

interface AuthPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthPopup({ isOpen, onOpenChange }: AuthPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md p-0 overflow-hidden"
        onInteractOutside={(e) => {
            // Prevent closing on outside click
            e.preventDefault();
        }}
        hideCloseButton={true}
        >
          <div className="relative h-40">
              <Image 
                src="https://i.pinimg.com/564x/e3/37/a9/e337a902f5a6396c21e67e3a95d70b92.jpg"
                alt="Abstract background"
                fill
                className="object-cover"
                data-ai-hint="leaves nature abstract"
              />
              <div className="absolute inset-0 bg-primary/40" />
          </div>
        <div className="p-6">
            <DialogHeader className="text-center items-center">
            <Logo />
            <DialogTitle className="text-xl pt-2">Join Examplify Today</DialogTitle>
            <DialogDescription className="text-center">
                Unlock your full potential. Sign up or log in to access all features and start your learning journey.
            </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex flex-col space-y-2">
              <Button asChild size="lg">
                <Link href="/signup">
                  Create an Account
                  <UserPlus className="ml-2" />
                </Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log In</Link>
              </p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
