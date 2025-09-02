
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Exam } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { getCookie } from '@/lib/utils';

interface ExamCardProps {
  exam: Exam;
  isFree: boolean;
  price?: number;
}

export default function ExamCard({ exam, isFree, price }: ExamCardProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // In a real app, you'd have a proper auth context.
    // For now, we'll simulate checking login status from cookies.
    const loggedInUser = getCookie('user_loggedin');
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleStartExam = () => {
    // if (isLoggedIn) {
      router.push(`/exams/${exam.id}`);
    // } else {
    //   router.push('/signup');
    // }
  };

  const estimatedTime = Math.round(exam.numberOfQuestions * 1.5);
  return (
    <Card className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 overflow-hidden">
        <CardHeader className="p-0 relative">
            <div className="aspect-video w-full relative">
                <Image
                    src={exam.image.src}
                    alt={exam.title}
                    fill
                    className="object-cover"
                    data-ai-hint={exam.image.hint}
                />
            </div>
            <div className="absolute top-0 left-0">
                <div className="relative mt-2 ml-[-5px] px-4 py-1">
                    <div className={`absolute inset-0 ${isFree ? 'bg-orange-500' : 'bg-green-600'} transform -skew-x-12`}></div>
                    <span className="relative text-white text-xs font-bold">
                        {isFree ? 'FREE EXAM' : 'PREMIUM EXAM'}
                    </span>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold leading-snug truncate">{exam.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
                <span>Marks : {exam.numberOfQuestions * 2}</span>
                <span className="mx-2">·</span>
                <span>{estimatedTime} mins</span>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center bg-card">
            <Button onClick={handleStartExam} className="w-full bg-orange-400 hover:bg-orange-500 text-white">
              Start Exam
            </Button>
            {!isFree && price && (
                <div className="text-right ml-2">
                    <p className="text-sm font-semibold text-primary">Price : INR {price}</p>
                </div>
            )}
        </CardFooter>
      </Card>
  );
}
