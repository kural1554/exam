'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Exam, Question, Answer } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adaptiveExamQuestionSelection } from '@/ai/flows/adaptive-exam-question-selection';

interface ExamTakerProps {
  exam: Exam;
  questions: Question[];
}

export default function ExamTaker({ exam, questions }: ExamTakerProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Start with a medium difficulty question
    const initialQuestion = questions.find(q => q.difficulty === 5) || questions[0];
    setCurrentQuestion(initialQuestion);
    setRemainingQuestions(questions.filter(q => q.id !== initialQuestion.id));
  }, [questions]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return (answers.length / questions.length) * 100;
  }, [answers, questions]);

  const findNextQuestion = (targetDifficulty: number, questionPool: Question[]): Question | null => {
    if (questionPool.length === 0) return null;
    
    let closestQuestion = questionPool[0];
    let minDiff = Math.abs(closestQuestion.difficulty - targetDifficulty);

    for (const q of questionPool) {
      const diff = Math.abs(q.difficulty - targetDifficulty);
      if (diff < minDiff) {
        minDiff = diff;
        closestQuestion = q;
      }
    }
    return closestQuestion;
  };

  const handleNext = async () => {
    if (!selectedAnswer || !currentQuestion) {
      toast({ title: "Please select an answer.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (remainingQuestions.length === 0) {
      localStorage.setItem(`exam_results_${exam.id}`, JSON.stringify({ answers: newAnswers, exam, questions }));
      router.push(`/exams/${exam.id}/results`);
      return;
    }

    try {
      const { newDifficulty } = await adaptiveExamQuestionSelection({
        currentDifficulty,
        userAnswerCorrect: isCorrect,
        examType: exam.category,
      });

      const nextQuestion = findNextQuestion(newDifficulty, remainingQuestions);
      
      setCurrentDifficulty(newDifficulty);
      setCurrentQuestion(nextQuestion);
      setRemainingQuestions(remainingQuestions.filter(q => q.id !== nextQuestion?.id));
      setSelectedAnswer('');
    } catch (error) {
      console.error("Failed to get next question:", error);
      toast({ title: "Error", description: "Could not fetch the next question. Please try again.", variant: "destructive" });
      // Fallback to random question
      const nextQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
      setCurrentQuestion(nextQuestion);
      setRemainingQuestions(remainingQuestions.filter(q => q.id !== nextQuestion?.id));
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentQuestion) {
    return <Card className="w-full max-w-2xl"><CardContent className="p-6"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></CardContent></Card>;
  }

  return (
    <Card className="w-full max-w-2xl shadow-2xl">
      <CardHeader>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Question {answers.length + 1} of {questions.length}</p>
          <Progress value={progress} className="w-full mt-2" />
        </div>
        <CardTitle className="text-2xl">{currentQuestion.questionText}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <Label key={index} htmlFor={`option-${index}`} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:bg-muted has-[[data-state=checked]]:border-primary">
              <RadioGroupItem value={option} id={`option-${index}`} className="mr-4" />
              <span>{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleNext} disabled={isLoading || !selectedAnswer}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {remainingQuestions.length > 0 ? 'Next Question' : 'Finish Exam'}
        </Button>
      </CardFooter>
    </Card>
  );
}
