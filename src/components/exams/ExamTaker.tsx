
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Exam, Question, Answer } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Star } from 'lucide-react';
import { cn, setCookie } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import ExamNavbar from './ExamNavbar';
import Image from 'next/image';

interface ExamTakerProps {
  exam: Exam;
  questions: Question[];
  onQuit: () => void;
  onSubmit: () => void;
}

export default function ExamTaker({ exam, questions: initialQuestions, onQuit, onSubmit }: ExamTakerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, { answer: string; marked: boolean }>>(new Map());
  const [timeLeft, setTimeLeft] = useState(initialQuestions.length * 90); // 1.5 minutes per question
  const [questions, setQuestions] = useState(initialQuestions);
  
  const [textSize, setTextSize] = useState('text-lg'); // Default: Normal
  const [language, setLanguage] = useState('english');

  const router = useRouter();
  
  const handleSubmit = useCallback(() => {
    const finalAnswers: Answer[] = questions.map(q => {
      const userAnswer = answers.get(q.id)?.answer;
      // For language simulation, we check against the original question's correct answer
      const originalQuestion = initialQuestions.find(iq => iq.id === q.id);
      return {
        questionId: q.id,
        userAnswer: userAnswer || '',
        isCorrect: userAnswer === originalQuestion?.correctAnswer,
      };
    });
    setCookie(`exam_results_${exam.id}`, { answers: finalAnswers, exam, questions: initialQuestions });
    onSubmit();
  }, [answers, exam, questions, initialQuestions, onSubmit]);

  const handleQuitExam = useCallback(() => {
      onQuit();
  }, [onQuit]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  useEffect(() => {
    const translatedQuestions = initialQuestions.map(q => {
      if (language === 'hindi' && q.translations?.hindi) {
        const translation = q.translations.hindi;
        // The correct answer value remains the same as in English, but the options are translated.
        // We need to find the translated version of the correct answer.
        const originalCorrectAnswerIndex = q.options.indexOf(q.correctAnswer);
        const translatedCorrectAnswer = translation.options[originalCorrectAnswerIndex];

        return {
          ...q,
          questionText: translation.questionText,
          options: translation.options,
          correctAnswer: translatedCorrectAnswer, // The value of the correct answer is now in Hindi
        };
      }
      return q; // Return original question if no translation
    });
    setQuestions(translatedQuestions);
  }, [language, initialQuestions]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  const totalDuration = initialQuestions.length * 90;

  const updateAnswer = (questionId: string, answer: string, marked: boolean) => {
    setAnswers(prev => new Map(prev).set(questionId, { answer, marked }));
  };

  const handleSelectAnswer = (answer: string) => {
    updateAnswer(currentQuestion.id, answer, isMarked);
  };

  const handleMarkForReview = () => {
    updateAnswer(currentQuestion.id, selectedAnswer, !isMarked);
    handleNext();
  };
  
  const handleClearAnswer = () => {
    updateAnswer(currentQuestion.id, '', isMarked);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const answeredCount = Array.from(answers.values()).filter(a => !!a.answer).length;
  const markedCount = Array.from(answers.values()).filter(a => !!a.marked).length;
  const notAnsweredCount = questions.length - answeredCount;
  
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers.get(currentQuestion.id)?.answer || '';
  const isMarked = answers.get(currentQuestion.id)?.marked || false;

  return (
    <>
      <ExamNavbar 
        textSize={textSize}
        onTextSizeChange={setTextSize}
        language={language}
        onLanguageChange={setLanguage}
      />
      <div className="bg-background w-full h-full">
        <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start container mx-auto py-8">
          <div className="md:col-span-1">
            <Card className="shadow-lg bg-card/60 border-0">
              <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>{exam.title}</span>
                    <span>Exam Duration: {formatTime(totalDuration)}</span>
                </div>
                <CardTitle className="text-3xl font-bold">
                  Question {currentIndex + 1} of {questions.length}
                </CardTitle>
                <p className={cn("pt-4", textSize)}>{currentQuestion.questionText}</p>
                {currentQuestion.image && (
                  <div className="mt-4 relative w-full aspect-video">
                    <Image
                      src={currentQuestion.image.src}
                      alt={currentQuestion.image.alt}
                      fill
                      className="object-contain rounded-md"
                      data-ai-hint={currentQuestion.image.hint}
                    />
                  </div>
                )}
                 <div className="flex justify-between items-center text-sm text-muted-foreground pt-4">
                    <span>2 Mark(s)</span>
                    <button onClick={() => updateAnswer(currentQuestion.id, selectedAnswer, !isMarked)}>
                        <Star className={cn("h-5 w-5", isMarked ? 'text-yellow-400 fill-current' : 'text-muted-foreground')}/>
                    </button>
                 </div>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswer} onValueChange={handleSelectAnswer} className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <Label key={index} htmlFor={`option-${index}`} className={cn("flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[[data-state=checked]]:bg-muted has-[[data-state=checked]]:border-primary border-border/50", textSize)}>
                      <RadioGroupItem value={option} id={`option-${index}`} className="mr-4" />
                      <span className="flex-1">{option}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between items-center flex-wrap gap-2 mt-8 p-6 pt-0">
                <div>
                  <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                  <Button onClick={handleMarkForReview} variant="outline" className="ml-2">
                    Mark for Review & Next
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next</Button>
                  <Button onClick={handleClearAnswer} variant="ghost" className="ml-2">Clear Answer</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-lg text-center bg-card/60 border-0">
              <CardHeader>
                <CardTitle className="text-5xl font-bold tracking-widest">{formatTime(timeLeft)}</CardTitle>
                <CardDescription>Total Time: {formatTime(totalDuration)}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-lg bg-card/60 border-0">
              <CardHeader>
                <CardTitle>{exam.title}</CardTitle>
                <CardDescription>{exam.category}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                  const status = answers.get(q.id);
                  const isAnswered = !!status?.answer;
                  const isMarkedForReview = !!status?.marked;
                  
                  return (
                    <Button 
                      key={q.id}
                      variant={currentIndex === index ? 'default' : 'outline'}
                      size="icon"
                      className={cn(
                        'h-10 w-10 relative font-bold',
                        isAnswered && 'bg-green-500/80 hover:bg-green-500 text-white border-green-700',
                        !isAnswered && 'bg-muted/40 border-border/50',
                        isMarkedForReview && 'ring-2 ring-offset-2 ring-yellow-400 ring-offset-background'
                      )}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
            <Card className="shadow-lg bg-card/60 border-0">
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-base">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Answered:</span>
                        <span className="font-bold">{answeredCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Marked for Review:</span>
                        <span className="font-bold">{markedCount}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Not Answered:</span>
                        <span className="font-bold">{notAnsweredCount}</span>
                    </div>
                     <div className="mt-6 space-y-2">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                               <Button className="w-full">Submit & Finish</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to finish the exam?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      This will end the exam session and submit your answers. You cannot go back.
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                      onClick={handleSubmit}
                                  >
                                      Finish & View Results
                                  </AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                      <Button variant="destructive" className="w-full" onClick={handleQuitExam}>End Exam</Button>
                  </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
