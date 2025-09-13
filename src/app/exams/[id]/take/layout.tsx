
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function TakeExamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const { id: examId } = params;
    const [isClient, setIsClient] = useState(false);
    const isSubmittingRef = useRef(false);
    

    const handleQuitExam = useCallback(() => {
        if (isSubmittingRef.current) return;
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You exited fullscreen or switched tabs. Your exam session has ended.",
        });
        // Use a timeout to allow the user to see the toast message before redirecting
        setTimeout(() => {
            router.push(`/exams`);
        }, 500);
    }, [router, toast]);

    const handleSubmitExam = useCallback(() => {
        isSubmittingRef.current = true;
         if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        router.push(`/exams/${examId}/results`);
    }, [router, examId]);
    
    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                handleQuitExam();
            }
        };

        const handleFullscreenChange = () => {
            // Add a small delay to allow isSubmittingRef to be updated
            setTimeout(() => {
                if (!document.fullscreenElement && !isSubmittingRef.current) {
                    handleQuitExam();
                }
            }, 100);
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
             if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, [handleQuitExam]);

    
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <main className="flex-1">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                         return React.cloneElement(child, { onQuit: handleQuitExam, onSubmit: handleSubmitExam } as any);
                    }
                    return child;
                })}
            </main>
        </div>
    )
}
