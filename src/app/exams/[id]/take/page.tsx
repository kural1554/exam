import { mockExams, mockQuestions } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ExamTaker from '@/components/exams/ExamTaker';

export default function TakeExamPage({ params }: { params: { id: string } }) {
  const exam = mockExams.find((e) => e.id === params.id);
  const questions = mockQuestions.filter((q) => q.examId === params.id);

  if (!exam || questions.length === 0) {
    notFound();
  }

  return (
    <ExamTaker exam={exam} questions={questions} />
  );
}
