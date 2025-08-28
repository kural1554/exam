import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import Link from "next/link";


const ExamHeader = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="mr-6">
                    <Logo />
                </Link>
                <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5"/>
                    <span className="font-semibold">00:29:54</span>
                </div>
                <Button>Submit</Button>
            </div>
        </header>
    )
}


export default function TakeExamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col bg-muted/30 dark:bg-gray-900">
            <ExamHeader />
            <main className="flex-1 container mx-auto py-8">{children}</main>
        </div>
    )
}
