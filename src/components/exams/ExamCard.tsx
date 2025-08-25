import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Exam } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <Link href={`/exams/${exam.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={exam.image.src}
              alt={exam.title}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={exam.image.hint}
            />
            <div className={cn("absolute inset-0 rounded-t-lg", exam.color, "opacity-20 group-hover:opacity-10 transition-opacity")}></div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{exam.category}</Badge>
          <CardTitle className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">{exam.title}</CardTitle>
          <CardDescription className="mt-2 text-sm line-clamp-2">{exam.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 mr-1.5" />
                {exam.numberOfQuestions} Questions
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Start
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
