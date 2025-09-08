
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ExamNavbar from "@/components/exams/ExamNavbar";
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
    const layoutRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    
    // Using a ref to track submission status to prevent multiple submissions
    const hasSubmitted = useRef(false);

    const handleSubmitExam = useCallback(() => {
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
        
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You exited fullscreen or switched tabs. Your exam has been submitted automatically.",
        });

        router.push(`/exams/${examId}/results`);
    }, [router, examId, toast]);

    const requestFullscreen = useCallback(() => {
        if (layoutRef.current && typeof layoutRef.current.requestFullscreen === 'function') {
            layoutRef.current.requestFullscreen({ navigationUI: 'hide' })
                .catch((err) => {
                    console.error("Could not enter fullscreen mode:", err);
                });
        }
    }, []);

    const exitFullscreenHandler = useCallback(() => {
        if (!document.fullscreenElement) {
            handleSubmitExam();
        }
    }, [handleSubmitExam]);
    
    const visibilityChangeHandler = useCallback(() => {
        if (document.visibilityState === 'hidden') {
            handleSubmitExam();
        }
    }, [handleSubmitExam]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        requestFullscreen();
        document.addEventListener('fullscreenchange', exitFullscreenHandler);
        document.addEventListener('visibilitychange', visibilityChangeHandler);
        
        return () => {
            document.removeEventListener('fullscreenchange', exitFullscreenHandler);
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.error(err));
            }
        };
    }, [isClient, requestFullscreen, exitFullscreenHandler, visibilityChangeHandler]);

    return (
        <div ref={layoutRef} className="relative flex min-h-screen flex-col bg-background">
            <ExamNavbar />
            
            <main className="flex-1">
                {/* Pass props to children using cloneElement */}
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        // Pass a submit function that can be triggered from the child
                         return React.cloneElement(child, { onSubmit: handleSubmitExam } as any);
                    }
                    return child;
                })}
            </main>
        </div>
    )
}
