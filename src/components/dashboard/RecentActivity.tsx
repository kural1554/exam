import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockExams } from '@/lib/mock-data';
import type { ExamAttempt } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
  data: ExamAttempt[];
}

export default function RecentActivity({ data }: RecentActivityProps) {
  const recentAttempts = data
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {recentAttempts.map((attempt) => {
        const exam = mockExams.find((e) => e.id === attempt.examId);
        return (
          <div key={attempt.id} className="flex items-center">
            <Avatar className={cn('h-9 w-9', exam?.color)}>
              <AvatarFallback className="bg-transparent text-primary-foreground">
                {exam?.title.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {exam?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Score: {attempt.score}%
              </p>
            </div>
            <div className="ml-auto font-medium text-sm text-muted-foreground">
              {formatDistanceToNow(attempt.completedAt, { addSuffix: true })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
