
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
}

export default function FeedbackModal({ isOpen, onClose, examTitle }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating is required",
        description: "Please select a star rating before submitting.",
      });
      return;
    }
    // In a real app, you'd send this data to your backend
    console.log({
      examTitle,
      rating,
      feedback,
    });
    setIsSubmitted(true);
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setRating(0);
    setFeedback('');
    onClose();
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
                  <button key={star} onClick={() => setRating(star)}>
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
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>Send</Button>
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
