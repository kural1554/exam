
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
  image?: File | null;
  hasImage: boolean;
}

export default function ExamsAdminPage() {
  const { toast } = useToast();
  const [examType, setExamType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [date, setDate] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [topics, setTopics] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 1,
        hasImage: false,
      },
    ]);
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };
  
  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Exam Created Successfully!",
        description: "The new exam has been added to the list.",
    });
    console.log({
        examType,
        difficulty,
        subtopic,
        date,
        numQuestions,
        timeLimit,
        topics,
        questions
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Exam</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Fill in the details for the new exam.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exam-type">Exam Type</Label>
              <Select onValueChange={setExamType} value={examType}>
                <SelectTrigger id="exam-type">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ibps-po">IBPS PO</SelectItem>
                  <SelectItem value="ibps-clerk">IBPS Clerk</SelectItem>
                  <SelectItem value="tnpsc">TNPSC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={setDifficulty} value={difficulty}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtopic">Subtopic</Label>
              <Input id="subtopic" value={subtopic} onChange={(e) => setSubtopic(e.target.value)} placeholder="e.g., Algebra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="num-questions">Number of Questions</Label>
              <Input id="num-questions" type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} placeholder="e.g., 50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-limit">Time Limit (in minutes)</Label>
              <Input id="time-limit" type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} placeholder="e.g., 60" />
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label htmlFor="topics">Related Topics (comma-separated)</Label>
              <Input id="topics" value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="e.g., Quadratic Equations, Geometry" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Add questions for this exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {questions.map((q, qIndex) => (
                <Card key={q.id} className="p-4 relative bg-muted/20">
                     <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeQuestion(qIndex)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`q-text-${q.id}`}>Question {qIndex + 1}</Label>
                            <Textarea id={`q-text-${q.id}`} value={q.questionText} onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)} placeholder="Enter the question" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((opt, optIndex) => (
                                <div key={optIndex} className="space-y-2">
                                    <Label htmlFor={`q-${q.id}-opt-${optIndex}`}>Option {optIndex + 1}</Label>
                                    <Input id={`q-${q.id}-opt-${optIndex}`} value={opt} onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)} placeholder={`Option ${optIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                             <div className="space-y-2">
                                <Label htmlFor={`q-correct-${q.id}`}>Correct Answer</Label>
                                <Select onValueChange={(value) => handleQuestionChange(qIndex, 'correctAnswer', value)} value={q.correctAnswer}>
                                    <SelectTrigger id={`q-correct-${q.id}`}>
                                        <SelectValue placeholder="Select correct answer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {q.options.filter(o => o).map((opt, i) => (
                                            <SelectItem key={i} value={opt}>{opt}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`q-marks-${q.id}`}>Marks</Label>
                                <Input id={`q-marks-${q.id}`} type="number" value={q.marks} onChange={(e) => handleQuestionChange(qIndex, 'marks', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Checkbox id={`q-image-check-${q.id}`} checked={q.hasImage} onCheckedChange={(checked) => handleQuestionChange(qIndex, 'hasImage', checked)} />
                           <Label htmlFor={`q-image-check-${q.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Add Image to Question
                            </Label>
                        </div>
                        {q.hasImage && (
                             <div className="space-y-2">
                                <Label htmlFor={`q-image-${q.id}`}>Upload Image</Label>
                                <Input id={`q-image-${q.id}`} type="file" onChange={(e) => handleQuestionChange(qIndex, 'image', e.target.files ? e.target.files[0] : null)} />
                            </div>
                        )}
                    </div>
                </Card>
                ))}
                <Button type="button" variant="outline" onClick={addQuestion}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
            </CardContent>
            <CardFooter>
                 <Button type="submit" size="lg">Create Exam</Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
