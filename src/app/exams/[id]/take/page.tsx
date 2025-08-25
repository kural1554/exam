import { mockExams, mockQuestions } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ExamTaker from '@/components/exams/ExamTaker';
import Logo from '@/components/Logo';

export default function TakeExamPage({ params }: { params: { id: string } }) {
  const exam = mockExams.find((e) => e.id === params.id);
  const questions = mockQuestions.filter((q) => q.examId === params.id);

  if (!exam || questions.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 border-b">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <ExamTaker exam={exam} questions={questions} />
      </main>
    </div>
  );
}
