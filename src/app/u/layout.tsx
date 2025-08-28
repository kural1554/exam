import UserAdminHeader from '@/components/layout/UserAdminHeader';
import UserAdminSidebar from '@/components/layout/UserAdminSidebar';

export default function UserAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <UserAdminSidebar />
      <div className="flex flex-col">
        <UserAdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
