'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/exams', label: 'Practice Exams' },
  { href: '#', label: 'LMS' },
  { href: '#', label: 'Courses' },
  { href: '#', label: 'Tricks' },
  { href: '#', label: 'Pattern' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'Syllabus' },
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Contact Us' },
];

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
             <Link
                href={'#'}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Syllabus
              </Link>
               <Link
                href={'#'}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                About Us
              </Link>
               <Link
                href={'#'}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Contact Us
              </Link>
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
             <Link href="/" className="mr-6" onClick={() => setIsOpen(false)}>
                <Logo />
             </Link>
            <div className="flex flex-col mt-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                   onClick={() => setIsOpen(false)}
                  className="transition-colors hover:text-foreground/80 text-foreground/80"
                >
                  {item.label}
                </Link>
              ))}
               <hr className="my-4" />
                <div className="flex flex-col space-y-2">
                    <Button asChild variant="outline">
                        <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                     <Button asChild>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search input can go here */}
          </div>
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
