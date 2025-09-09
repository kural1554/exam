
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getExams } from '@/services/api';
import { ChevronRight, Search, Loader2, ArrowLeft } from 'lucide-react';
import ExamCard from '@/components/exams/ExamCard';
import type { Exam } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { mockCategories, mockSubCategories, mockChildCategories, mockNewChildCategories, mockExams } from '@/lib/mock-data';

type SelectionLevel = 'examTitle' | 'category' | 'subCategory' | 'childCategory' | 'exams';

export default function ExamsPage() {
    const [level, setLevel] = useState<SelectionLevel>('examTitle');
    const [selections, setSelections] = useState({
        examTitle: '',
        category: '',
        subCategory: '',
        childCategory: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (level: SelectionLevel, value: string) => {
        const newSelections = { ...selections, [level]: value };
        
        // Reset subsequent levels
        if (level === 'examTitle') {
            newSelections.category = '';
            newSelections.subCategory = '';
            newSelections.childCategory = '';
        } else if (level === 'category') {
            newSelections.subCategory = '';
            newSelections.childCategory = '';
        } else if (level === 'subCategory') {
            newSelections.childCategory = '';
        }

        setSelections(newSelections);

        const nextLevelMap: Record<string, SelectionLevel> = {
            examTitle: 'category',
            category: 'subCategory',
            subCategory: 'childCategory',
            childCategory: 'exams',
        };
        setLevel(nextLevelMap[level]);
    };

    const handleBack = () => {
        if (level === 'category') {
            setLevel('examTitle');
            setSelections(s => ({ ...s, examTitle: '' }));
        } else if (level === 'subCategory') {
            setLevel('category');
            setSelections(s => ({ ...s, category: '' }));
        } else if (level === 'childCategory') {
            setLevel('subCategory');
            setSelections(s => ({ ...s, subCategory: '' }));
        } else if (level === 'exams') {
             if (selections.childCategory) setLevel('childCategory');
             else if (selections.subCategory) setLevel('subCategory');
             else if (selections.category) setLevel('category');
             else setLevel('examTitle');
        }
    };
    
    const filteredExams = useMemo(() => {
        return mockExams.filter(exam => {
            const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesExamTitle = !selections.examTitle || exam.examTitle === selections.examTitle;
            const matchesCategory = !selections.category || exam.category === selections.category;
            const matchesSubCategory = !selections.subCategory || exam.subCategory === selections.subCategory;
            const matchesChildCategory = !selections.childCategory || exam.childCategory === selections.childCategory;
            return matchesSearch && matchesExamTitle && matchesCategory && matchesSubCategory && matchesChildCategory;
        });
    }, [selections, searchTerm]);

    const renderContent = () => {
        if (level !== 'exams') {
            let items: { id: number; name: string }[] = [];
            let currentLevel: SelectionLevel = 'examTitle';
            let title = "Select Exam Title";
            
            if (level === 'examTitle') {
                items = mockCategories;
                currentLevel = 'examTitle';
                title = "Select Exam Title";
            } else if (level === 'category') {
                items = mockSubCategories;
                currentLevel = 'category';
                title = `Categories for ${selections.examTitle}`
            } else if (level === 'subCategory') {
                items = mockChildCategories;
                currentLevel = 'subCategory';
                title = `Sub Categories for ${selections.category}`
            } else if (level === 'childCategory') {
                items = mockNewChildCategories;
                currentLevel = 'childCategory';
                title = `Child Categories for ${selections.subCategory}`
            }

            return (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            {level !== 'examTitle' && (
                                <Button variant="ghost" size="icon" onClick={handleBack}>
                                    <ArrowLeft />
                                </Button>
                            )}
                            <CardTitle>{title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map(item => (
                            <Button
                                key={item.id}
                                variant="outline"
                                className="h-auto py-4 text-base justify-between"
                                onClick={() => handleSelect(currentLevel, item.name)}
                            >
                                {item.name}
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )
        }

        return (
            <div>
                <div className="flex items-center gap-4 mb-4">
                     <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft />
                    </Button>
                    <h2 className="text-2xl font-bold tracking-tight">Filtered Exams</h2>
                </div>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
                        <p className="md:col-span-3 text-muted-foreground">No exams found for the selected criteria.</p>
                    )}
                </div>
            </div>
        )
    };

    const breadcrumbs = [
        selections.examTitle,
        selections.category,
        selections.subCategory,
        selections.childCategory
    ].filter(Boolean).join(' > ');

  return (
    <div className="container mx-auto py-8">
        <section className="space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-3xl font-bold tracking-tight">Practice Exams</h1>
                 <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search Exams..." 
                        className="pl-10 h-12" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {breadcrumbs && (
                <div className="text-sm text-muted-foreground">
                    Path: {breadcrumbs}
                </div>
            )}
           
            {renderContent()}
        </section>
    </div>
  );
}
