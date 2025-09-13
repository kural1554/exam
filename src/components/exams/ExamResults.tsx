
'use client';

import React, { useMemo, useState } from 'react';
import type { Answer, Exam, Question, User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn, formatTime, getCookie } from '@/lib/utils';
import { CheckCircle, HelpCircle, Info, Loader2, RefreshCw, XCircle, Star, Target, Zap, Clock, ThumbsUp, Check, Award } from 'lucide-react';
import Link from 'next/link';
import { generateQuestionExplanations } from '@/ai/flows/generate-question-explanations';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Image from 'next/image';
import FeedbackModal from './FeedbackModal';

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
        Get AI Explanation
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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const userDetails = getCookie('user_details');
    if (userDetails) {
      setUser(userDetails);
    }
  }, []);


  const { score, correctAnswers, totalQuestions, accuracy, percentile, rank, timeSpent } = useMemo(() => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const total = questions.length;
    const scorePercentage = Math.round((correctCount / total) * 100);

    // Mock data for other stats as we don't have this data
    const mockRank = Math.floor(Math.random() * 500) + 1;
    const mockTotalParticipants = 1979;
    const mockPercentile = parseFloat(((mockTotalParticipants - mockRank) / mockTotalParticipants * 100).toFixed(2));
    const mockAccuracy = parseFloat((scorePercentage * (Math.random() * (1 - 0.8) + 0.8)).toFixed(2)); // accuracy is related to score
    
    // Assuming 1.5 mins per question was the total time
    const totalTimeAllowed = total * 90;
    const mockTimeSpent = Math.floor(totalTimeAllowed * (Math.random() * (0.9 - 0.6) + 0.6));


    return {
        score: scorePercentage,
        correctAnswers: correctCount,
        totalQuestions: total,
        accuracy: mockAccuracy,
        percentile: mockPercentile,
        rank: mockRank,
        timeSpent: mockTimeSpent,
    };
  }, [answers, questions]);

  const performanceStats = [
    { title: 'Your Score', value: `${score}`, total: 100, icon: Check, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { title: 'Your Rank', value: rank, total: 1979, icon: Award, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { title: 'Percentile', value: `${percentile}`, total: 100, icon: Zap, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    { title: 'Accuracy', value: `${accuracy}`, total: 100, icon: Target, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { title: 'Time Spent', value: formatTime(timeSpent), total: formatTime(questions.length * 90 * 1.5), icon: Clock, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  ];

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <FeedbackModal 
            isOpen={isFeedbackModalOpen}
            onClose={handleFeedbackModalClose}
            examTitle={exam.title}
            examId={exam.id}
        />
        <header>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{exam.title}</h1>
                    <div className="text-sm text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>Attempted on {format(new Date(), "dd MMM, yyyy | hh:mm a")}</span>
                        <span>|</span>
                        <span>Total Questions : {questions.length}</span>
                        <span>|</span>
                        <span>Marks : {questions.length * 2}</span>
                         <span>|</span>
                        <span>Time : {Math.round(questions.length * 1.5)} mins</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" onClick={() => setShowAnswers(!showAnswers)}>
                        {showAnswers ? "Hide Solutions" : "View Solutions"}
                    </Button>
                    <Button asChild className="bg-red-500 hover:bg-red-600">
                        <Link href={`/exams/${exam.id}/take`}><RefreshCw className="mr-2 h-4 w-4"/> Re-Attempt</Link>
                    </Button>
                </div>
            </div>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Overall Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {performanceStats.map(stat => (
                        <Card key={stat.title} className="p-4 flex flex-col items-center justify-center">
                             <div className={`p-3 rounded-full ${stat.bgColor} mb-2`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <p className="text-xl font-bold">{stat.value}<span className="text-sm text-muted-foreground">/{stat.total}</span></p>
                            <p className="text-xs text-muted-foreground">{stat.title}</p>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {showAnswers && (
            <Card>
                <CardHeader>
                <CardTitle>Sectional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
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
                            <span className="flex-1">{index+1}. {question.questionText}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {question.options.map(option => (
                                        <div 
                                            key={option} 
                                            className={cn("p-3 rounded-md border text-sm", 
                                                option === question.correctAnswer ? "bg-green-100 dark:bg-green-900/30 border-green-500" : "",
                                                option === answer?.userAnswer && !answer.isCorrect ? "bg-red-100 dark:bg-red-900/30 border-red-500" : ""
                                            )}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
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
        </div>
        <div className="lg:col-span-1">
            <Card className="text-center">
                <CardContent className="p-6">
                    <Image src="https://i.pinimg.com/564x/e3/37/a9/e337a902f5a6396c21e67e3a95d70b92.jpg" alt="Rate this test" width={200} height={200} className="mx-auto" data-ai-hint="rating illustration" />
                    <h3 className="text-lg font-semibold mt-4">Rate this test</h3>
                    <p className="text-sm text-muted-foreground mt-1">We would love to know how was your experience with this test?</p>
                    <Button className="mt-4" onClick={() => setIsFeedbackModalOpen(true)}>Rate Now</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
