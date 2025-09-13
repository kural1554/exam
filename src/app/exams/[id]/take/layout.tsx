
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
    const isSubmittingRef = useRef(false);
    
    const handleQuitExam = useCallback(() => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You have left the exam.",
        });

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error("Failed to exit fullscreen:", err));
        }
        
        // Use a timeout to ensure state is updated before navigation
        setTimeout(() => {
            router.push(`/exams`);
        }, 100);

    }, [router, toast]);

    const handleSubmitExam = useCallback(() => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error("Failed to exit fullscreen:", err));
        }
        
        // Navigate immediately after setting the flag
        router.push(`/exams/${examId}/results`);

    }, [router, examId]);
    
    useEffect(() => {
        const enterFullscreen = () => {
            if (typeof window !== 'undefined' && document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            }
        };

        // enterFullscreen();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !isSubmittingRef.current) {
                handleQuitExam();
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !isSubmittingRef.current) {
                // A very short delay to allow the submission flag to be set
                setTimeout(() => {
                    if (!isSubmittingRef.current) {
                         handleQuitExam();
                    }
                }, 100);
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
             if (document.fullscreenElement && !isSubmittingRef.current) {
                document.exitFullscreen().catch(err => console.error("Failed to exit fullscreen:", err));
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
