import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Examplify - AI-Powered Practice Exams",
  description:
    "Adaptive practice exams with AI-powered explanations to help you master any subject.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased flex flex-col"
        )}
      >
        <div className="relative flex flex-col flex-1">
           <main className="flex-1">{children}</main>
           <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
