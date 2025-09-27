// app/admin/exams/edit/[id]/page.tsx

'use client';

// 1. Import useParams from next/navigation
import { useParams } from 'next/navigation';

import ExamsAdminPage from '@/app/admin/exams/ExamsAdminPage';
import { getExamByIdForAdmin } from '@/services/api';
import { useEffect, useState } from 'react';
import type { FullExamData } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// 2. Remove `params` from the function signature
export default function EditExamPage() {
    // 3. Get the params using the hook
    const params = useParams();
    const id = params.id as string; // Get the id and tell TypeScript it's a string

    const [examData, setExamData] = useState<FullExamData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 4. Use the `id` variable from the hook
        if (!id) return;
        
        const fetchExamData = async () => {
            setIsLoading(true);
            try {
                const data = await getExamByIdForAdmin(id);
                setExamData(data);
            } catch (error) {
                console.error("Failed to fetch exam data:", error);
                toast.error("Could not load exam data for editing.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExamData();
    // 5. Add `id` to the dependency array
    }, [id]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading Exam for Editing...</span>
        </div>;
    }

    if (!examData) {
        return <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Exam Not Found</h2>
            <p>The exam you are trying to edit could not be found.</p>
        </div>;
    }

    return <ExamsAdminPage existingExamData={examData} />;
}