
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
        
        isSubmittingRef.current = true; // Prevent multiple triggers
        
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You have left the exam.",
        });

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
        
        setTimeout(() => {
            router.push(`/exams`);
        }, 300);
    }, [router, toast]);

    const handleSubmitExam = useCallback(() => {
        isSubmittingRef.current = true;
         if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
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

        enterFullscreen();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !isSubmittingRef.current) {
                handleQuitExam();
            }
        };

        const handleFullscreenChange = () => {
            // Give a small delay to allow the isSubmittingRef to be set
            setTimeout(() => {
                if (!document.fullscreenElement && !isSubmittingRef.current) {
                    handleQuitExam();
                }
            }, 500); 
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
             if (document.fullscreenElement) {
                // Don't exit fullscreen if we are submitting
                if (!isSubmittingRef.current) {
                   document.exitFullscreen().catch(err => console.error(err));
                }
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
