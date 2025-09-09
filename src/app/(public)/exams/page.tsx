
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getExams } from '@/services/api';
import { Search, Loader2 } from 'lucide-react';
import ExamCard from '@/components/exams/ExamCard';
import type { Exam } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { mockCategories, mockSubCategories, mockChildCategories, mockNewChildCategories, mockExams } from '@/lib/mock-data';

export default function ExamsPage() {
    const [selections, setSelections] = useState({
        examTitle: 'all',
        category: 'all',
        subCategory: 'all',
        childCategory: 'all',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (level: keyof typeof selections, value: string) => {
        const newSelections = { ...selections, [level]: value };
        
        // When a higher-level filter changes, reset the lower-level ones
        if (level === 'examTitle') {
            newSelections.category = 'all';
            newSelections.subCategory = 'all';
            newSelections.childCategory = 'all';
        } else if (level === 'category') {
            newSelections.subCategory = 'all';
            newSelections.childCategory = 'all';
        } else if (level === 'subCategory') {
            newSelections.childCategory = 'all';
        }

        setSelections(newSelections);
    };

    const filteredExams = useMemo(() => {
        return mockExams.filter(exam => {
            const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesExamTitle = selections.examTitle === 'all' || exam.examTitle === selections.examTitle;
            const matchesCategory = selections.category === 'all' || exam.category === selections.category;
            const matchesSubCategory = selections.subCategory === 'all' || exam.subCategory === selections.subCategory;
            const matchesChildCategory = selections.childCategory === 'all' || exam.childCategory === selections.childCategory;
            return matchesSearch && matchesExamTitle && matchesCategory && matchesSubCategory && matchesChildCategory;
        });
    }, [selections, searchTerm]);

  return (
    <div className="container mx-auto py-8">
        <section className="space-y-6">
             <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                 <h1 className="text-3xl font-bold tracking-tight">Practice Exams</h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 w-full md:flex-initial md:min-w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search for exams..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card">
                 <Select value={selections.examTitle} onValueChange={(value) => handleSelect('examTitle', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Exam Title" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Exam Titles</SelectItem>
                        {mockCategories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={selections.category} onValueChange={(value) => handleSelect('category', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                         {mockSubCategories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={selections.subCategory} onValueChange={(value) => handleSelect('subCategory', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Sub Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sub Categories</SelectItem>
                        {mockChildCategories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={selections.childCategory} onValueChange={(value) => handleSelect('childCategory', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Child Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Child Categories</SelectItem>
                        {mockNewChildCategories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
           
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredExams.length > 0 ? (
                    filteredExams.map((exam, index) => (
                        <ExamCard 
                            key={exam.id} 
                            exam={exam} 
                            isFree={index % 2 === 0} 
                            price={index % 2 !== 0 ? 75 : undefined} 
                        />
                    ))
                ) : (
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-20">
                        <h2 className="text-2xl font-semibold">No Exams Found</h2>
                        <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>
        </section>
    </div>
  );
}
