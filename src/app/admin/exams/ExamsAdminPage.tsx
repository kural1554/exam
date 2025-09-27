'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,CardContent,CardDescription,CardHeader,
  CardTitle,CardFooter} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { 
    getExamTitles, 
    getCategories, 
    getSubcategories, 
    getChildCategories,
    createExam,
    updateExam
} from '@/services/api';
// Assuming you have these types defined in '@/lib/types'
import type { FullExamData, ExamTitle, Category, SubCategory, ChildCategory } from '@/lib/types'; 

// State for questions needs to handle both new and existing questions/options
interface QuestionState {
  id: number | string; 
  question_text: string;
  marks: number;
  options: {
    id?: number; 
    option_text: string;
  }[];
  correctAnswer: string;
}

// Define the props that this component will accept
interface ExamsAdminPageProps {
    existingExamData?: FullExamData | null;
}

export default function ExamsAdminPage({ existingExamData }: ExamsAdminPageProps) {
  const router = useRouter();
  
  const isEditMode = Boolean(existingExamData);

  // --- State for fetched dropdown data ---
  const [examTitles, setExamTitles] = useState<ExamTitle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- State for all form inputs ---
  const [selectedExamTitle, setSelectedExamTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);
  const [isPaid, setIsPaid] = useState(false);
  const [negativeMark, setNegativeMark] = useState(0.25);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [examMetaTitle, setExamMetaTitle] = useState('');
  const [examMetaKeywords, setExamMetaKeywords] = useState('');
  const [examMetaDescription, setExamMetaDescription] = useState('');

  // 1. Data fetching for dropdowns (runs only once on mount)
  useEffect(() => {
    const loadDropdownData = async () => {
        try {
            const [titlesData, catsData, subCatsData, childCatsData] = await Promise.all([
                getExamTitles(), getCategories(), getSubcategories(), getChildCategories()
            ]);
            setExamTitles(Array.isArray(titlesData) ? titlesData : []);
            setCategories(Array.isArray(catsData) ? catsData : []);
            setSubCategories(Array.isArray(subCatsData) ? subCatsData : []);
            setChildCategories(Array.isArray(childCatsData) ? childCatsData : []);
        } catch (error) {
            toast.error("Failed to load initial data for the form.");
            console.error(error);
        }
    };
    
    loadDropdownData();
  }, []); // Run only on mount

  // 2. Initial state population (runs when in edit mode AND when dropdown data is loaded)
  // THIS IS THE CRITICAL FIX: Ensure full dropdown lists are available before setting the selected values.
  useEffect(() => {
    if (isEditMode && existingExamData && categories.length > 0 && subCategories.length > 0 && childCategories.length > 0) {
        // All selected values must be set as strings, as React state update order
        // ensures that setting the parent category first will trigger useMemo for subcategories.
        setSelectedExamTitle(String(existingExamData.exam_title_ref || ''));
        setSelectedCategory(String(existingExamData.category_ref || ''));
        
        // Setting these after the parent ensures the useMemo hooks run with the full data
        // and the correct parent selection, populating the filtered lists correctly.
        setSelectedSubCategory(String(existingExamData.sub_category_ref || ''));
        setSelectedChildCategory(String(existingExamData.child_category_ref || ''));
        
        setExamDescription(existingExamData.description || '');
        setDifficulty(existingExamData.difficulty || '');
        setTimeLimit(existingExamData.time_limit_minutes);
        setIsPaid(existingExamData.is_paid);
        setNegativeMark(existingExamData.negative_mark);
        setExamMetaTitle(existingExamData.meta_title || '');
        setExamMetaKeywords(existingExamData.meta_keywords || '');
        setExamMetaDescription(existingExamData.meta_description || '');
        
        const formattedQuestions = existingExamData.questions.map(q => {
            const correctOption = q.options.find(opt => opt.is_correct);
            return {
                id: q.id,
                question_text: q.question_text,
                marks: q.marks,
                options: q.options.map(opt => ({ id: opt.id, option_text: opt.option_text })),
                correctAnswer: correctOption ? correctOption.option_text : ''
            };
        });
        setQuestions(formattedQuestions);
    }
  }, [
    isEditMode, 
    existingExamData, 
    // Dependencies to ensure this runs only when the data is ready
     categories, subCategories, childCategories 
  ]); 

  // --- Cascading dropdown logic (This is correct and relies on the state above) ---
  const filteredCategories = useMemo(() => 
    selectedExamTitle 
      ? categories.filter(c => String(c.exam_title) === selectedExamTitle) 
      : [], [selectedExamTitle, categories]);

  const filteredSubCategories = useMemo(() => 
    selectedCategory 
      ? subCategories.filter(sc => String(sc.category) === selectedCategory) 
      : [], 
  [selectedCategory, subCategories]);

  const filteredChildCategories = useMemo(() => 
    selectedSubCategory 
      ? childCategories.filter(cc => String(cc.sub_category) === selectedSubCategory) 
      : [], 
  [selectedSubCategory, childCategories]);


  // --- Handlers (These are correct) ---
  // When parent changes, reset child states to prevent stale selection
  const handleExamTitleChange = (value: string) => { 
    setSelectedExamTitle(value); 
    setSelectedCategory(''); 
    setSelectedSubCategory(''); 
    setSelectedChildCategory(''); 
  };
  const handleCategoryChange = (value: string) => { 
    setSelectedCategory(value); 
    setSelectedSubCategory(''); 
    setSelectedChildCategory(''); 
  };
  const handleSubCategoryChange = (value: string) => { 
    setSelectedSubCategory(value); 
    setSelectedChildCategory(''); 
  };
  
  const addQuestion = () => setQuestions([...questions, { id: `new_${Date.now()}`, question_text: '', options: [{ option_text: ''}, { option_text: ''}, { option_text: ''}, { option_text: ''}], correctAnswer: '', marks: 1 }]);
  // Note: These handlers use non-strict equality comparison for index/field/value, typical for quick state updates.
  const handleQuestionChange = (index: number, field: keyof QuestionState, value: any) => { 
    const newQ = [...questions]; 
    (newQ[index] as any)[field] = value; // Type assertion needed for dynamic field access
    setQuestions(newQ); 
  };
  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => { 
    const newQ = [...questions]; 
    newQ[qIndex].options[optIndex].option_text = value; 
    setQuestions(newQ); 
  };
  const removeQuestion = (index: number) => setQuestions(questions.filter((_, i) => i !== index));

  // --- Submit handler (This is correct) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
        exam_title_ref: Number(selectedExamTitle),
        category_ref: Number(selectedCategory),
        sub_category_ref: selectedSubCategory ? Number(selectedSubCategory) : null,
        child_category_ref: selectedChildCategory ? Number(selectedChildCategory) : null,
        description: examDescription,
        difficulty: difficulty,
        // Use timeLimit ?? null to ensure correct type for API if timeLimit is undefined
        time_limit_minutes: timeLimit ?? null, 
        is_paid: isPaid,
        negative_mark: negativeMark,
        meta_title: examMetaTitle,
        meta_keywords: examMetaKeywords,
        meta_description: examMetaDescription,
        // Ensure that new questions don't send their temporary string IDs to the API
        questions: questions.map(q => ({
            // If it's an existing question (number ID), include it for update
            ...(typeof q.id === 'number' && { id: q.id }), 
            question_text: q.question_text,
            marks: q.marks,
            options: q.options.map(opt => ({
                // If it's an existing option (number ID), include it for update
                ...(opt.id && { id: opt.id }), 
                option_text: opt.option_text,
                is_correct: opt.option_text === q.correctAnswer && opt.option_text !== ''
            }))
        }))
    };
    if (!payload.exam_title_ref || !payload.category_ref) {
        toast.error("Please fill all required fields: Exam Title and Category.");
        setIsLoading(false);
        return;
    }
    
    // Simple question validation check (can be expanded)
    if (questions.some(q => !q.question_text || q.options.filter(o => o.option_text).length < 2 || !q.correctAnswer)) {
      toast.error("Please ensure all questions have text, at least two options, and a correct answer selected.");
      setIsLoading(false);
      return;
    }

    try {
        if (isEditMode) {
            if (!existingExamData?.id) throw new Error("Exam ID is missing for update.");
            await updateExam(existingExamData.id, payload);
            toast.success("Exam Updated Successfully!");
            router.push('/admin/exam-list');
        } else {
            await createExam(payload);
            toast.success("Exam Created Successfully!");
            router.push('/admin/exam-list');
        }
    } catch (error) {
        console.error(`Failed to ${isEditMode ? 'update' : 'create'} exam:`, error);
        // Display a more specific error if possible, or a generic one
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} exam. Check console for details.`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Exam' : 'Create Exam'}</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>
                {isEditMode ? 'Make changes to the existing exam details.' : 'Fill in the details for the new exam.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exam-title-name">Exam Title *</Label>
              <Select onValueChange={handleExamTitleChange} value={selectedExamTitle}>
                <SelectTrigger><SelectValue placeholder="Select exam title" /></SelectTrigger>
                <SelectContent>{examTitles.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={handleCategoryChange} value={selectedCategory} disabled={!selectedExamTitle}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{filteredCategories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-category">Sub Category</Label>
              <Select onValueChange={handleSubCategoryChange} value={selectedSubCategory} disabled={!selectedCategory}>
                <SelectTrigger><SelectValue placeholder="Select sub category" /></SelectTrigger>
                <SelectContent>{filteredSubCategories.map(sc => <SelectItem key={sc.id} value={String(sc.id)}>{sc.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="child-category">Child Category</Label>
              <Select onValueChange={setSelectedChildCategory} value={selectedChildCategory} disabled={!selectedSubCategory}>
                <SelectTrigger><SelectValue placeholder="Select child category" /></SelectTrigger>
                <SelectContent>{filteredChildCategories.map(cc => <SelectItem key={cc.id} value={String(cc.id)}>{cc.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={setDifficulty} value={difficulty}>
                <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <Label htmlFor="exam-description">Exam Description</Label>
                <Textarea id="exam-description" value={examDescription} onChange={(e) => setExamDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                <Input id="time-limit" type="number" value={timeLimit ?? ''} onChange={(e) => setTimeLimit(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 60" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="negative-mark">Negative Mark</Label>
                <Input id="negative-mark" type="number" step="0.01" value={negativeMark} onChange={(e) => setNegativeMark(Number(e.target.value))} />
            </div>
            <div className="flex items-center space-x-2 pt-6">
                <Switch id="paid-toggle" checked={isPaid} onCheckedChange={setIsPaid} />
                <Label htmlFor="paid-toggle">Is this a Paid Exam?</Label>
            </div>
             <div className="space-y-4 md:col-span-3 border-t pt-6 mt-6">
                <h3 className="text-lg font-medium">SEO for Exam</h3>
                <div className="space-y-2"><Label htmlFor="exam-meta-title">Meta Title</Label><Input id="exam-meta-title" value={examMetaTitle} onChange={(e) => setExamMetaTitle(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="exam-meta-keywords">Meta Keywords</Label><Input id="exam-meta-keywords" value={examMetaKeywords} onChange={(e) => setExamMetaKeywords(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="exam-meta-description">Meta Description</Label><Textarea id="exam-meta-description" value={examMetaDescription} onChange={(e) => setExamMetaDescription(e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Add or edit questions for this exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {questions.map((q, qIndex) => (
                    <Card key={q.id} className="p-4 relative bg-muted/20">
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeQuestion(qIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`q-text-${q.id}`}>Question {qIndex + 1}</Label>
                              <Textarea id={`q-text-${q.id}`} value={q.question_text} onChange={(e) => handleQuestionChange(qIndex, 'question_text', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="space-y-2">
                                      <Label htmlFor={`q-${q.id}-opt-${optIndex}`}>Option {optIndex + 1}</Label>
                                      <Input id={`q-${q.id}-opt-${optIndex}`} value={opt.option_text} onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)} />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor={`q-correct-${q.id}`}>Correct Answer</Label>
                                    <Select onValueChange={(value) => handleQuestionChange(qIndex, 'correctAnswer', value)} value={q.correctAnswer}>
                                        <SelectTrigger><SelectValue placeholder="Select correct answer" /></SelectTrigger>
                                        <SelectContent>
                                          {/* Only show non-empty options in the correct answer dropdown */}
                                          {q.options.filter(o => o.option_text).map((opt, i) => 
                                            <SelectItem key={i} value={opt.option_text}>{opt.option_text}</SelectItem>
                                          )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`q-marks-${q.id}`}>Marks</Label>
                                  <Input 
                                    id={`q-marks-${q.id}`} 
                                    type="number" 
                                    value={q.marks} 
                                    onChange={(e) => handleQuestionChange(qIndex, 'marks', parseInt(e.target.value, 10) || 0)} 
                                  />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
                <Button type="button" variant="outline" onClick={addQuestion}><PlusCircle className="mr-2 h-4 w-4" /> Add Question</Button>
            </CardContent>
            <CardFooter>
                 <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Exam')}
                 </Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}