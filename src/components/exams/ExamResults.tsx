
'use client';

import React, { useMemo, useState } from 'react';
import type { Answer, Exam, Question } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { CheckCircle, HelpCircle, Info, Loader2, RefreshCw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { generateQuestionExplanations } from '@/ai/flows/generate-question-explanations';
import { useToast } from '@/hooks/use-toast';

interface ExamResultsProps {
  answers: Answer[];
  exam: Exam;
  questions: Question[];
}

const Explanation = ({ question, userAnswer }: { question: Question; userAnswer: string }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const getExplanation = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await generateQuestionExplanations([
        {
          questionId: question.id,
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          userAnswer: userAnswer,
        },
      ]);
      setExplanation(result[question.id]);
    } catch (e) {
      setError('Failed to generate explanation. Please try again.');
      toast({ variant: 'destructive', title: 'Error', description: 'Could not generate explanation.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!explanation && !isLoading && !error) {
    return (
      <Button variant="outline" size="sm" onClick={getExplanation}>
        <HelpCircle className="mr-2 h-4 w-4" />
        Get Explanation
      </Button>
    );
  }

  return (
    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
      <h4 className="font-semibold flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> Explanation</h4>
      {isLoading && <Loader2 className="my-4 h-5 w-5 animate-spin" />}
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      {explanation && <p className="text-sm mt-2 whitespace-pre-wrap">{explanation}</p>}
    </div>
  );
};

export default function ExamResults({ answers, exam, questions }: ExamResultsProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  
  const score = useMemo(() => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / questions.length) * 100);
  }, [answers, questions]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Results for {exam.title}</CardTitle>
          <CardDescription>Here's how you did. Review your answers below.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-2 p-6 bg-card rounded-lg border">
                <div className="text-6xl font-bold text-primary">{score}%</div>
                <div className="text-lg text-muted-foreground">Your Score</div>
                <Progress value={score} className="w-full mt-2" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-6 bg-card rounded-lg border">
                <div className="text-6xl font-bold">{answers.filter(a => a.isCorrect).length}/{questions.length}</div>
                <div className="text-lg text-muted-foreground">Correct Answers</div>
            </div>
        </CardContent>
      </Card>
      
      {showAnswers && (
        <Card>
            <CardHeader>
            <CardTitle>Question Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {questions.map((question, index) => {
                const answer = answers.find((a) => a.questionId === question.id);
                return (
                    <AccordionItem key={question.id} value={`item-${index}`}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-4 w-full text-left">
                        {answer?.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                        <span className="flex-1">{question.questionText}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                        <p className="text-sm">
                            <span className="font-semibold">Your answer: </span>
                            <span className={cn(answer?.isCorrect ? 'text-green-500' : 'text-destructive')}>
                            {answer?.userAnswer || 'Not answered'}
                            </span>
                        </p>
                        {!answer?.isCorrect && (
                            <p className="text-sm">
                            <span className="font-semibold">Correct answer: </span>
                            <span className="text-green-500">{question.correctAnswer}</span>
                            </p>
                        )}
                        <Explanation question={question} userAnswer={answer?.userAnswer || ''} />
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                );
                })}
            </Accordion>
            </CardContent>
        </Card>
      )}

       <div className="text-center space-x-4">
            <Button size="lg" onClick={() => setShowAnswers(!showAnswers)}>
              {showAnswers ? 'Hide Answers' : 'View Answers'}
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/exams/${exam.id}/take`}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Exam
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/exams">Choose Another Exam</Link>
            </Button>
        </div>
    </div>
  );
}
