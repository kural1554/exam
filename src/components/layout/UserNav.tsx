
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as UserType } from '@/lib/types';
import Link from 'next/link';
import { BookCopy, Home, LogOut, Settings, User, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCookie, removeCookie } from '@/lib/utils';
import { useEffect, useState } from 'react';

const UserNav = ({ user: passedUser }: { user?: UserType }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(passedUser || null);

  useEffect(() => {
    if (!passedUser) {
      const userDetails = getCookie('user_details');
      if (userDetails) {
        setUser(userDetails);
      }
    }
  }, [passedUser]);

  const handleLogout = () => {
    removeCookie('user_loggedin');
    removeCookie('user_details');
    setUser(null);
    router.push('/login');
    // Force a reload to ensure header state is updated everywhere
    router.refresh(); 
  };
    
  if (!user) return null;

  const userInitials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('') || '';

  const isAdmin = user.isAdmin;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
           <DropdownMenuItem asChild>
            <Link href={isAdmin ? "/admin" : "/dashboard"}>
              {isAdmin ? <GraduationCap className="mr-2 h-4 w-4" /> : <Home className="mr-2 h-4 w-4" />}
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          {!isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/exams">
                <BookCopy className="mr-2 h-4 w-4" />
                <span>Exams</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
             <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
