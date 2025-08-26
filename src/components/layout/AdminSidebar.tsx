'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  BookUser,
  Library,
  Book,
  Calendar,
  BookOpen,
  Banknote,
  Star,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/faculties', label: 'Faculties', icon: BookUser },
  { href: '/admin/departments', label: 'Departments', icon: Library },
  { href: '/admin/subjects', label: 'Subjects', icon: Book },
  { href: '/admin/timetable', label: 'Timetable', icon: Calendar },
  { href: '/admin/lectures', label: 'Lectures', icon: BookOpen },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/dons', label: 'Dons', icon: BookUser },
  { href: '/admin/exams', label: 'Exams', icon: FileText },
  { href: '/admin/finance', label: 'Finance', icon: Banknote },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Logo />
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === item.href && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
