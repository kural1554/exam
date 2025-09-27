// app/admin/exam-list/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import correct API functions and Type
import { getExamsForAdmin, deleteExam,patchExam } from '@/services/api';
import type { ExamListItem } from '@/lib/types'; // Use the correct type for the list view

// UI Component imports...
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Trash, Pencil,PlayCircle, 
    StopCircle, PlusCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ExamListPage() {
  // Use the correct type for the state
  const [exams, setExams] = useState<ExamListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const data = await getExamsForAdmin();
      if (Array.isArray(data)) {
        setExams(data);
      } else {
        setExams([]);
        console.error("API did not return an array for exams:", data);
      }
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      toast.error('Failed to fetch exams.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // --- DELETE FUNCTIONALITY ---
  const handleDeleteExam = async (examId: number) => {
    if (!window.confirm("Are you sure you want to delete (archive) this exam? This action cannot be undone.")) {
        return;
    }
    try {
        const response = await deleteExam(examId);
        if (response.ok || response.status === 204) {
            toast.success("Exam has been successfully archived.");
            // Refresh the list after deleting
            await fetchExams();
        } else {
            toast.error("Failed to delete the exam.");
        }
    } catch (error) {
        console.error("Error deleting exam:", error);
        toast.error("An error occurred while deleting the exam.");
    }
  };

  // --- EDIT NAVIGATION ---
  const handleEditExam = (examId: number) => {
    // We will create this page in the next step
    router.push(`/admin/exams/edit/${examId}`);
  };
  
  // --- VIEW NAVIGATION (for student's view) ---
  const handleViewExam = (examId: number) => {
    // You can create a preview page for this later
    toast.info(`Navigating to view page for Exam ID: ${examId}`);
    // Example: router.push(`/exams/${examId}/preview`);
  };

const handleTogglePublish = async (exam: ExamListItem) => {
    const newStatus = exam.status === 'published' ? 'draft' : 'published';
    const actionWord = newStatus === 'published' ? 'Publishing' : 'Unpublishing';
    
    try {
        await patchExam(exam.id, { status: newStatus });
        toast.success(`Exam has been successfully set to ${newStatus}.`);
        await fetchExams(); // Refresh the list to show the new status
    } catch (error) {
        console.error(`${actionWord} exam failed:`, error);
        toast.error(`Failed to ${newStatus} the exam.`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Exams...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Exam List</h1>
        {/* The "Add Exam" button now correctly points to the create page you already built */}
        <Button onClick={() => router.push('/admin/exams')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Exam
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>All Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.exam_name}</TableCell>
                      <TableCell>{exam.category}</TableCell>
                      <TableCell>{exam.question_count}</TableCell>
                      <TableCell>
                        <Badge 
                            variant={exam.status === 'published' ? 'default' : (exam.status === 'archived' ? 'destructive' : 'secondary')}
                            className={
                                exam.status === 'published' ? 'bg-green-100 text-green-800' :
                                exam.status === 'archived' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }
                        >
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(exam.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewExam(exam.id)}>
                              <Eye className="mr-2 h-4 w-4" /> View as Student
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditExam(exam.id)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>{exam.status !== 'archived' && (
                            <DropdownMenuItem onClick={() => handleTogglePublish(exam)}>
                            {exam.status === 'published' ? (
                                <StopCircle className="mr-2 h-4 w-4 text-orange-500" />
                            ) : (
                                <PlayCircle className="mr-2 h-4 w-4 text-green-500" />
                            )}
                            {exam.status === 'published' ? 'Set to Draft' : 'Publish'}
                            </DropdownMenuItem>
                        )}
                            
                            <DropdownMenuSeparator />
                             <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteExam(exam.id)}>
                            <Trash className="mr-2 h-4 w-4" /> Delete (Archive)
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                            No exams found. Click "Add Exam" to create one.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {exams.length} of {exams.length} entries
          </div>
          {/* Add pagination logic here later */}
        </CardFooter>
      </Card>
    </>
  );
}