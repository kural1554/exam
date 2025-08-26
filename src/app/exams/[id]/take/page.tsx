import { mockExams, mockQuestions } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ExamTaker from '@/components/exams/ExamTaker';
import PublicHeader from '@/components/layout/PublicHeader';

export default function TakeExamPage({ params }: { params: { id: string } }) {
  const exam = mockExams.find((e) => e.id === params.id);
  const questions = mockQuestions.filter((q) => q.examId === params.id);

  if (!exam || questions.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <PublicHeader />
      <main className="flex-1 container mx-auto py-8">
        <ExamTaker exam={exam} questions={questions} />
      </main>
    </div>
  );
}
