import PublicHeader from "@/components/layout/PublicHeader";

export default function ExamsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <PublicHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">{children}</main>
        </div>
    )
}
