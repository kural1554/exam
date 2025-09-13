
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
        className="sm:max-w-sm p-0 overflow-hidden"
        onInteractOutside={(e) => {
            e.preventDefault();
        }}
        hideCloseButton={true}
        >
          <div className="relative h-40">
              <Image 
                src="https://i.pinimg.com/564x/82/e7/28/82e7287b91acb66d6f024e07c98845b1.jpg"
                alt="Abstract background"
                fill
                className="object-cover"
                data-ai-hint="woman leaves abstract"
              />
              <div className="absolute inset-0 bg-primary/40" />
          </div>
        <div className="p-6">
            <DialogHeader className="text-center items-center">
            <Logo />
            <DialogTitle className="text-xl pt-2">Your Learning Journey Awaits</DialogTitle>
            <DialogDescription className="text-center">
                Sign in or create an account to save your progress and access all features.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-row sm:flex-row sm:space-x-2 w-full gap-2">
            <Button asChild variant="outline" className="flex-1">
                <Link href="/login"><LogIn /> Log In</Link>
            </Button>
            <Button asChild className="flex-1">
                <Link href="/signup"><UserPlus /> Sign Up</Link>
            </Button>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
