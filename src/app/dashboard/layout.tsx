import AppSidebar from "@/components/layout/AppSidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
