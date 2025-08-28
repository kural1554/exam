import PublicHeader from "@/components/layout/PublicHeader";


export default function TakeExamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <PublicHeader />
            <main className="flex-1 container mx-auto py-8">{children}</main>
        </div>
    )
}
