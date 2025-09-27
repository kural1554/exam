// app/(public)/verify-email/[uidb64]/[token]/page.tsx

"use client";

import React, { useEffect, useState, useRef } from 'react'; // useRef ah import pannunga
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { verifyEmail } from '@/services/api';

export default function VerifyEmailPage() {
    const params = useParams();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // ✅ PUTHU CHANGE: Oru "gatekeeper" maathiri intha ref ah use panrom
    const verificationAttempted = useRef(false);

    useEffect(() => {
        // ✅ PUTHU CHANGE: Verification ippove nadanthurucha nu check panrom
        if (verificationAttempted.current) {
            return; // Nadanthuruntha, ethuvum seiyama veliya poidu
        }

        const uidb64 = params.uidb64 as string;
        const token = params.token as string;

        if (uidb64 && token) {
            const doVerification = async () => {
                // ✅ PUTHU CHANGE: Verification start panrathuku munnadi gate ah moodidrom
                verificationAttempted.current = true;
                
                try {
                    const data = await verifyEmail(uidb64, token);
                    setSuccessMessage(data.message);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            doVerification();
        } else {
            setError("Invalid verification link.");
            setLoading(false);
        }

    }, [params]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Account Verification</h1>
                
                {/* Matha code la entha maathamum illa */}
                {loading && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                        <p className="text-muted-foreground">Verifying your account, please wait...</p>
                    </div>
                )}

                {/* ✅ PUTHU CHANGE: loading illama iruntha mattum kaatrom */}
                {!loading && error && (
                    <div className="text-red-500">
                        <p className="font-semibold">Verification Failed</p>
                        <p>{error}</p>
                        <Button asChild className="mt-4">
                            <Link href="/signup">Try Signing Up Again</Link>
                        </Button>
                    </div>
                )}

                {/* ✅ PUTHU CHANGE: loading illama iruntha mattum kaatrom */}
                {!loading && successMessage && (
                    <div className="text-green-500">
                        <p className="font-semibold">Verification Successful!</p>
                        <p>{successMessage}</p>
                        <Button asChild className="mt-4">
                            <Link href="/login">Proceed to Login</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}