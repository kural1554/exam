// app/admin/exams/view/[id]/page.tsx

'use client';
import { useParams } from 'next/navigation';
import { getExamByIdForAdmin } from '@/services/api';
import { useEffect, useState } from 'react';
import type { FullExamData } from '@/lib/types'; // Import the new type
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function ViewExamPage( ) {
    const params = useParams();
    const id = params.id as string;
    const [exam, setExam] = useState<FullExamData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchExamData = async () => {
            setIsLoading(true);
            try {
                const data = await getExamByIdForAdmin(id);
                setExam(data);
            } catch (error) {
                toast.error("Could not load exam preview.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchExamData();
    }, [params.id]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>;
    }

    if (!exam) {
        return <div className="text-center py-10"><h2>Exam Not Found</h2></div>;
    }

    return (
        <div className="space-y-6">
            <Link href="/admin/exam-list" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Exam List
                </Button>
            </Link>

            <h1 className="text-3xl font-bold">Exam Preview</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>{exam.generated_exam_name}</CardTitle>
                    <CardDescription>{exam.description || "No description provided."}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <div><strong>Time Limit:</strong> {exam.time_limit_minutes || 'N/A'} minutes</div>
                    <div><strong>Total Questions:</strong> {exam.question_count}</div>
                    <div><strong>Total Marks:</strong> {exam.total_marks}</div>
                    <div><strong>Negative Mark:</strong> {exam.negative_mark}</div>
                    <div><strong>Status:</strong> <Badge>{exam.status}</Badge></div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mt-6">Questions</h2>
            <div className="space-y-4">
                {exam.questions.map((q, index) => (
                    <Card key={q.id}>
                        <CardHeader>
                            <CardTitle>Question {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium mb-4 whitespace-pre-wrap">{q.question_text}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                {q.options.map(opt => (
                                    <li key={opt.id} className={opt.is_correct ? 'text-green-600 font-bold' : ''}>
                                        {opt.option_text} {opt.is_correct && '(Correct Answer)'}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}