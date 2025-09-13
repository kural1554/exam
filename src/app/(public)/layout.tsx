
'use client';

import { useState, useEffect } from 'react';
import Footer from "@/components/layout/Footer";
import PublicHeader from "@/components/layout/PublicHeader";
import { getCookie } from '@/lib/utils';
import AuthPopup from '@/components/auth/AuthPopup';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const isLoggedIn = getCookie('user_loggedin');
        if (!isLoggedIn) {
        const timer = setTimeout(() => {
            setIsPopupOpen(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <AuthPopup isOpen={isPopupOpen} onOpenChange={setIsPopupOpen} />
            <PublicHeader />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
