
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ExamNavbar from "@/components/exams/ExamNavbar";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function TakeExamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const params = useParams();
    const { id: examId } = params;
    const layoutRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const requestFullscreen = useCallback(() => {
        if (layoutRef.current && typeof layoutRef.current.requestFullscreen === 'function') {
            layoutRef.current.requestFullscreen({ navigationUI: 'hide' })
                .then(() => setIsPaused(false))
                .catch((err) => {
                    console.error("Could not enter fullscreen mode:", err);
                    setIsPaused(true); 
                });
        }
    }, []);

    const exitFullscreenHandler = useCallback(() => {
        if (!document.fullscreenElement) {
            setIsPaused(true);
        }
    }, []);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        requestFullscreen();
        document.addEventListener('fullscreenchange', exitFullscreenHandler);
        
        return () => {
            document.removeEventListener('fullscreenchange', exitFullscreenHandler);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.error(err));
            }
        };
    }, [isClient, requestFullscreen, exitFullscreenHandler]);

    const handleQuitExam = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
        router.push('/exams');
    };

    const handleSubmitExam = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error(err));
        }
        router.push(`/exams/${examId}/results`);
    };

    return (
        <div ref={layoutRef} className="relative flex min-h-screen flex-col bg-background">
            <AlertDialog open={isPaused}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Fullscreen Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            To ensure exam integrity, this exam must be taken in fullscreen mode. Please re-enter fullscreen to continue. The timer is paused.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            variant="destructive"
                            onClick={handleQuitExam}
                        >
                            End Exam
                        </Button>
                        <AlertDialogAction onClick={requestFullscreen}>Re-enter Fullscreen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ExamNavbar />
            
            <main className="flex-1">
                {/* Pass props to children using cloneElement */}
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { isPaused, onSubmit: handleSubmitExam, onQuit: handleQuitExam } as any);
                    }
                    return child;
                })}
            </main>
        </div>
    )
}
