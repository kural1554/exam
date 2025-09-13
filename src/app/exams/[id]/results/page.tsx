
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ExamResults from '@/components/exams/ExamResults';
import type { Exam, Question, Answer } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import FeedbackModal from '@/components/exams/FeedbackModal';
import { getCookie, setCookie } from '@/lib/utils';

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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      const storedResults = getCookie(`exam_results_${id}`);
      const feedbackDone = getCookie(`feedback_submitted_${id}`);
      
      if (storedResults) {
        setResults(storedResults);
        if (!feedbackDone) {
          // Open the feedback modal after a short delay to allow the page to render
          const timer = setTimeout(() => setIsFeedbackModalOpen(true), 500);
          return () => clearTimeout(timer);
        } else {
            setShowResults(true);
        }
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleFeedbackClose = () => {
    setCookie(`feedback_submitted_${id}`, 'true');
    setShowResults(true);
    setIsFeedbackModalOpen(false);
  }

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
  
  // Always render ExamResults, but control its visibility
  return (
    <>
      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={handleFeedbackClose}
        examTitle={results.exam.title}
      />
      <div style={{ visibility: showResults ? 'visible' : 'hidden' }}>
        <ExamResults
            answers={results.answers}
            exam={results.exam}
            questions={results.questions}
        />
      </div>
       {!showResults && (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Preparing your results...</h1>
            </Card>
        </div>
      )}
    </>
  );
}
