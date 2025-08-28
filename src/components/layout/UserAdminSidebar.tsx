'use client';
import Link from 'next/link';
import {
  BookCopy,
  LayoutDashboard,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import { Button } from '../ui/button';

const mainNavItems = [
  { href: '/u/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/u/course', label: 'Course', icon: BookCopy },
  { href: '/u/exam', label: 'Exam', icon: BookCopy },
  { href: '/u/setting', label: 'Setting', icon: Settings },
];

const helpNavItems = [
    { href: '#', label: 'Help', icon: HelpCircle },
    { href: '/login', label: 'Log out', icon: LogOut },
]

export default function UserAdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-20 items-center justify-center border-b px-4 lg:px-6">
            <Logo />
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start p-4 text-sm font-medium">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary',
                  pathname === item.href && 'bg-primary text-primary-foreground hover:text-primary-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
             <nav className="grid items-start text-sm font-medium">
                {helpNavItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary'
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
                ))}
            </nav>
        </div>
      </div>
    </div>
  );
}
