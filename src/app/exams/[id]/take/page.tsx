
'use client';
import { mockExams, mockQuestions } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ExamTaker from '@/components/exams/ExamTaker';
import { useEffect, useState } from 'react';
import type { Exam, Question } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function TakeExamPage({ params }: { params: { id: string } }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedExams: Exam[] = JSON.parse(localStorage.getItem('exams') || '[]');
        const storedQuestions: Question[] = JSON.parse(localStorage.getItem('questions') || '[]');
        
        const allExams = [...storedExams, ...mockExams.filter(me => !storedExams.some(se => se.id === me.id))];
        const allQuestions = [...storedQuestions, ...mockQuestions.filter(mq => !storedQuestions.some(sq => sq.id === mq.id))];

        const currentExam = allExams.find((e) => e.id === params.id) || null;
        const currentQuestions = allQuestions.filter((q) => q.examId === params.id);
        
        setExam(currentExam);
        setQuestions(currentQuestions);
        setLoading(false);
    }
  }, [params.id]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!exam || !questions || questions.length === 0) {
    notFound();
  }

  return (
    <ExamTaker exam={exam} questions={questions} />
  );
}

    