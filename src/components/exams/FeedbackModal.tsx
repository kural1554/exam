
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { cn, getCookie } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { submitFeedback } from '@/services/api';
import type { User } from '@/lib/types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
}

export default function FeedbackModal({ isOpen, onClose, examTitle }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

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
        userName: user?.name || "Anonymous",
        userEmail: user?.email || "anonymous@example.com",
      });

      setIsSubmitted(true);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit your feedback. Please try again.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
    // Use a timeout to avoid seeing the state reset before the dialog closes
    setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setFeedback('');
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseAndReset()}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>How would you rate your experience?</DialogTitle>
              <DialogDescription>
                Your feedback helps us improve the exam experience for everyone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} disabled={isSubmitting}>
                    <Star
                      className={cn(
                        'h-8 w-8 cursor-pointer transition-colors',
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground/50'
                      )}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Tell us more..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
                <DialogTitle className="text-center text-2xl">Thank You!</DialogTitle>
                <DialogDescription className="text-center">
                    Your feedback has been submitted successfully.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center">
                <p>You can now view your results.</p>
            </div>
             <DialogFooter>
              <Button onClick={handleCloseAndReset}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
