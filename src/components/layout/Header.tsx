import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import UserNav from './UserNav';
import Logo from '../Logo';
import PublicHeader from './PublicHeader';
import { usePathname } from 'next/navigation';
import React from 'react';
import AppSidebar from './AppSidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 justify-between">
       <div className="flex items-center gap-4">
        <div className="md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                <AppSidebar />
            </SheetContent>
            </Sheet>
        </div>
        <Link href="/dashboard" className="hidden md:block">
            <Logo />
        </Link>
      </div>


      <div className="flex items-center gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exams..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-card"
            />
          </div>
        </form>
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
