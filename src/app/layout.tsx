"use client"

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { PreLoader } from "@/components/ui/PreLoader";

// Metadata is now defined as a static object, not exported as a constant
// export const metadata: Metadata = {
//   title: "Examplify - AI-Powered Practice Exams",
//   description:
//     "Adaptive practice exams with AI-powered explanations to help you master any subject.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <title>Examplify - AI-Powered Practice Exams</title>
        <meta
          name="description"
          content="Adaptive practice exams with AI-powered explanations to help you master any subject."
        />
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
          "min-h-screen bg-background font-body antialiased select-none"
        )}
      >
        {loading ? (
            <PreLoader />
        ) : (
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <div className="relative flex flex-col min-h-screen">{children}</div>
            <Toaster />
            </ThemeProvider>
        )}
      </body>
    </html>
  );
}
