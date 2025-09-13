
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
import { ArrowRight } from 'lucide-react';

interface AuthPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthPopup({ isOpen, onOpenChange }: AuthPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center items-center">
          <Logo />
          <DialogTitle className="text-2xl pt-4">Join Examplify Today</DialogTitle>
          <DialogDescription>
            Unlock your full potential. Sign up or log in to access all features and start your learning journey.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
          <Button asChild size="lg">
            <Link href="/signup">Create an Account <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href="/login">Log In</Link>
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
