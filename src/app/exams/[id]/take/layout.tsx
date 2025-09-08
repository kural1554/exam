
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
    

    const handleSubmitExam = useCallback(() => {
        toast({
            variant: "destructive",
            title: "Exam Terminated",
            description: "You exited fullscreen or switched tabs. Your exam has been submitted automatically.",
        });

        router.push(`/exams`);
    }, [router, examId, toast]);

    
    useEffect(() => {
        setIsClient(true);
    }, []);

    
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <main className="flex-1">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                         return React.cloneElement(child, { onSubmit: handleSubmitExam } as any);
                    }
                    return child;
                })}
            </main>
        </div>
    )
}
