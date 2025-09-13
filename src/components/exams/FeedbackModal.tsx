
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2, Smile, Frown, Meh, Angry, Laugh, X } from 'lucide-react';
import { cn, getCookie, setCookie } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { submitFeedback } from '@/services/api';
import type { User } from '@/lib/types';
import Image from 'next/image';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
  examId: string;
}

const ratingOptions = [
    { rating: 1, label: 'Very Bad', icon: Angry },
    { rating: 2, label: 'Bad', icon: Frown },
    { rating: 3, label: 'Average', icon: Meh },
    { rating: 4, label: 'Good', icon: Smile },
    { rating: 5, label: 'Excellent', icon: Laugh },
]

export default function FeedbackModal({ isOpen, onClose, examTitle, examId }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating is required",
        description: "Please select a star rating before submitting.",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const user: User | null = getCookie('user_details');
      
      await submitFeedback({
        examTitle,
        rating,
        comment: feedback,
        userName: user ? user.name : "Anonymous",
        userEmail: user ? user.email : "anonymous@example.com",
      });

      setCookie(`feedback_submitted_${examId}`, 'true');
      setIsSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback."
      })
      handleCloseAndReset();
      router.push(`/exams/${examId}/results`);

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit your feedback. Please try again.",
      });
       setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
    // Use a timeout to avoid seeing the state reset before the dialog closes
    setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setHoverRating(0);
        setFeedback('');
        setIsSubmitting(false);
    }, 300);
  }
  
  const handleSkip = () => {
    setCookie(`feedback_submitted_${examId}`, 'true');
    handleCloseAndReset();
    router.push(`/exams/${examId}/results`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseAndReset()}>
      <DialogContent className="sm:max-w-md p-0" onInteractOutside={(e) => e.preventDefault()}>
            <DialogClose asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={handleCloseAndReset}
                >
                <X className="h-4 w-4" />
                </Button>
            </DialogClose>
            <DialogHeader className="p-6 items-center text-center">
                 <Image src="https://i.pinimg.com/564x/e3/37/a9/e337a902f5a6396c21e67e3a95d70b92.jpg" alt="Feedback illustration" width={120} height={120} data-ai-hint="feedback illustration" />
                 <DialogTitle className="text-xl pt-2">Rate this test</DialogTitle>
                 <DialogDescription>
                    We would love to know how was your experience with this test?
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6 space-y-6">
              <div className="flex justify-center items-center gap-4">
                {ratingOptions.map((option) => (
                  <button 
                    key={option.rating} 
                    onClick={() => setRating(option.rating)} 
                    onMouseEnter={() => setHoverRating(option.rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isSubmitting}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <option.icon
                      className={cn(
                        'h-8 w-8 cursor-pointer transition-all',
                        option.rating <= (hoverRating || rating)
                          ? 'text-yellow-400 scale-110'
                          : ''
                      )}
                    />
                     <span className="text-xs font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Share your experience or suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter className="px-6 pb-6 sm:justify-center flex-col-reverse sm:flex-col-reverse gap-2 w-full">
                <Button variant="link" size="sm" onClick={handleSkip} disabled={isSubmitting} className="text-muted-foreground">
                    Rate Later
                </Button>
                <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
