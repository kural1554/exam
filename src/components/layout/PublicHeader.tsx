
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import { ChevronDown, Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn, getCookie } from '@/lib/utils';
import { ModeToggle } from '../ModeToggle';
import UserNav from './UserNav';
import type { User as UserType } from '@/lib/types';


const navItems = [
  { href: '/', label: 'Home' },
  { href: '/exams', label: 'Exams' },
  { href: '/courses', label: 'Courses' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/notification', label: 'Notification'},
  // { href: '/about', label: 'About Us' },
  // { href: '/contact', label: 'Contact Us' },
];

const moreMenuItems = [
    { href: '#', label: 'Free Live Classes' },
    { href: '#', label: 'Free Live Tests & Quizzes' },
    { href: '#', label: 'Free Quizzes' },
    { href: '#', label: 'Previous Year Papers' },
    { href: '#', label: 'Practice' },
    { href: '#', label: 'Refer and Earn' },
    { href: '#', label: 'All Exams' },
    { href: '#', label: 'Our Selections' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'IAS Preparation' },
    { href: '#', label: 'Current Affairs' },
];

const desktopNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/exams', label: 'Exams' },
    { href: '/courses', label: 'Courses' },
    { href: '/syllabus', label: 'Syllabus' },
    { href: '/notification', label: 'Notification'},
    // { href: '/about', label: 'About Us' },
    // { href: '/contact', label: 'Contact Us' },
];

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // Check login status from cookie
    const loggedInStatus = getCookie('user_loggedin');
    const userDetails = getCookie('user_details');
    setIsLoggedIn(!!loggedInStatus);
    if(loggedInStatus && userDetails) {
        setUser(userDetails);
    }
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {desktopNavLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 px-0 hover:bg-transparent">
                  More <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {moreMenuItems.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
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
        </div>
        
        <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
            <div className="md:hidden">
                 <Link href="/">
                    <Logo />
                </Link>
            </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="md:hidden">
                {isLoggedIn && user ? (
                    <UserNav user={user} />
                ) : (
                    <Button asChild size="sm">
                        <Link href="/login">Sign In</Link>
                    </Button>
                )}
            </div>
            <nav className="hidden md:flex items-center">
                {isLoggedIn && user ? (
                    <UserNav user={user} />
                ) : (
                  <Button asChild>
                      <Link href="/login">Sign In</Link>
                  </Button>
                )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
