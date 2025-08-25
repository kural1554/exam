import ExamCard from '@/components/exams/ExamCard';
import { mockExams } from '@/lib/mock-data';

export default function ExamsPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Exams</h1>
          <p className="text-muted-foreground">Choose an exam to start your practice session.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </>
  );
}
