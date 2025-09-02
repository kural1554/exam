import { mockExams } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

export default function ExamDetailsPage({ params }: { params: { id: string } }) {
  const exam = mockExams.find((e) => e.id === params.id);

  if (!exam) {
    notFound();
  }

  const estimatedTime = exam.numberOfQuestions * 1.5;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/exams" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all exams
      </Link>
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={exam.image.src}
            alt={exam.title}
            fill
            className="object-cover"
            data-ai-hint={exam.image.hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <CardHeader className="relative -mt-20 z-10">
          <CardTitle className="text-4xl font-extrabold tracking-tight text-white">{exam.title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-8">
            <div className="p-4 bg-card rounded-lg">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{exam.numberOfQuestions}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
            </div>
             <div className="p-4 bg-card rounded-lg">
                <Tag className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{exam.category}</p>
                <p className="text-sm text-muted-foreground">Category</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
                <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">~{estimatedTime} min</p>
                <p className="text-sm text-muted-foreground">Estimated Time</p>
            </div>
          </div>

          <div className="mb-8 px-6 text-center">
            <h3 className="text-xl font-semibold mb-2">About the Exam</h3>
            <p className="text-muted-foreground">{exam.description}</p>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="text-lg">
              <Link href={`/exams/${exam.id}/take`}>Start Exam</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
