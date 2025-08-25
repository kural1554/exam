import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";

export default function ExamsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/30">{children}</div>
                </main>
            </div>
        </div>
    )
}
