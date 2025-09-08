
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
    

    const handleQuitExam = useCallback(() => {
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You exited fullscreen or switched tabs. Your exam session has ended.",
        });
        // Use a timeout to allow the user to see the toast message before redirecting
        setTimeout(() => {
            router.push(`/exams`);
        }, 500);
    }, [router, examId, toast]);

    
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
            if (!document.fullscreenElement) {
                handleQuitExam();
            }
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
                         return React.cloneElement(child, { onQuit: handleQuitExam } as any);
                    }
                    return child;
                })}
            </main>
        </div>
    )
}
