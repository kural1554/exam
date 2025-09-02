
'use client';

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import {
  Bell,
  Home,
  LogOut,
  Settings,
  User,
  BookCopy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import UserNav from '@/components/layout/UserNav';
import { ModeToggle } from '@/components/ModeToggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/exams', label: 'Exams', icon: BookCopy },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter className="mt-auto">
            <UserNav />
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
         <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
                {/* Header Content */}
            </div>
            <ModeToggle />
            <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
