import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <GraduationCap className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tighter text-foreground">
        Examplify
      </span>
    </div>
  );
};

export default Logo;
