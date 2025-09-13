
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ExamResults from '@/components/exams/ExamResults';
import type { Exam, Question, Answer } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getCookie } from '@/lib/utils';
import { mockExams, mockQuestions } from '@/lib/mock-data';

interface StoredResults {
    answers: Answer[];
    exam: Exam;
    questions: Question[];
}

export default function ResultsPage() {
  const params = useParams();
  const { id } = params;
  const [results, setResults] = useState<StoredResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      let storedResults: StoredResults | null = getCookie(`exam_results_${id}`);
      
      // Fallback for demonstration if cookies are not set or cleared
      if (!storedResults) {
          const exam = mockExams.find(e => e.id === id);
          const questions = mockQuestions.filter(q => q.examId === id);
          if (exam && questions.length > 0) {
              const answers = questions.map(q => {
                  const isCorrect = Math.random() > 0.4; // 60% chance correct
                  const userAnswer = isCorrect ? q.correctAnswer : q.options.find(o => o !== q.correctAnswer) || q.options[0];
                  return {
                      questionId: q.id,
                      userAnswer,
                      isCorrect,
                  };
              });
              storedResults = { exam, questions, answers };
          }
      }
      
      if (storedResults) {
        setResults(storedResults);
      }
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </Card>
      </div>
    );
  }

  if (!results) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="p-8">
                <h1 className="text-2xl font-bold">No results found.</h1>
                <p className="text-muted-foreground">It seems you haven't completed this exam yet.</p>
            </Card>
        </div>
    );
  }
  
  return (
    <ExamResults
        answers={results.answers}
        exam={results.exam}
        questions={results.questions}
    />
  );
}
