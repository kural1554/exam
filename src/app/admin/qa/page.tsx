
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getFeedback } from "@/services/api";
import type { Feedback } from "@/lib/types";
import { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { format } from "date-fns";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AdminQAPage() {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchFeedback = async () => {
            setIsLoading(true);
            try {
                const data = await getFeedback();
                setFeedbackList(data);
            } catch (error) {
                console.error("Failed to fetch feedback", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeedback();
    }, [router]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Q/A and Help</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Feedback</CardTitle>
                    <CardDescription>Feedback submitted by users after completing exams.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : feedbackList.length === 0 ? (
                        <p className="text-muted-foreground text-center py-10">No feedback has been submitted yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {feedbackList.map((feedback) => (
                                <Card key={feedback.id} className="flex flex-col">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <Avatar>
                                            <AvatarFallback>{feedback.userName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{feedback.userName}</p>
                                            <p className="text-sm text-muted-foreground">{feedback.userEmail}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-2">
                                        <h4 className="font-medium">Exam: {feedback.examTitle}</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground pt-2 italic">"{feedback.comment}"</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-xs text-muted-foreground">{format(new Date(feedback.date), "PPP p")}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
