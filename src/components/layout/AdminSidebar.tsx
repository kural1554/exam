
'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  FilePenLine,
  ListTodo,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
  DollarSign,
  Star,
  List,
  Calendar,
  LayoutGrid,
  LayoutList,
  ListTree,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname , useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import Cookies from 'js-cookie';
const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/course', label: 'Course', icon: BookOpen },
  { href: '/admin/post', label: 'Post', icon: FileText },
  { href: '/admin/exam-title', label: 'Exam Title', icon: LayoutGrid },
  { href: '/admin/category', label: 'Category', icon: LayoutList },
  { href: '/admin/sub-category', label: 'Sub Category', icon: ListTree },
  { href: '/admin/child-category', label: 'Child Category', icon: ListTree },
  
 
  { href: '/admin/syllabus', label: 'Syllabus', icon: ListTodo },
  { href: '/admin/qa', label: 'Q/A', icon: HelpCircle },
  { href: '/admin/exams', label: 'Exams', icon: FilePenLine },
  { href: '/admin/exam-list', label: 'Exam List', icon: List },
  { href: '/admin/finance', label: 'Finance', icon: DollarSign },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/notification', label: 'Notification', icon: Bell },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
   const router = useRouter();

   const handleLogout = () => {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    
    
    Cookies.remove('userRole');
    
    
    router.push('/login');
  };

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')) && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
         <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-3 h-4 w-4" />
                Logout
            </Button>
        </div>
      </div>
    </div>
  );
}
