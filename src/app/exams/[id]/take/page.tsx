
'use client';
import React from 'react';
import { mockExams, mockQuestions } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ExamTaker from '@/components/exams/ExamTaker';
import { useEffect, useState } from 'react';
import type { Exam, Question } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface TakeExamPageProps {
  onQuit: () => void;
  onSubmit: () => void;
}

export default function TakeExamPage({ params, onQuit, onSubmit }: { params: { id: string } } & TakeExamPageProps) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with an API call to fetch exam and questions by ID
    const currentExam = mockExams.find((e) => e.id === params.id) || null;
    const currentQuestions = mockQuestions.filter((q) => q.examId === params.id);
    
    setExam(currentExam);
    setQuestions(currentQuestions);
    setLoading(false);
  }, [params.id]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!exam || !questions || questions.length === 0) {
    notFound();
  }

  return (
    <ExamTaker 
        exam={exam} 
        questions={questions} 
        onQuit={onQuit}
        onSubmit={onSubmit}
    />
  );
}
