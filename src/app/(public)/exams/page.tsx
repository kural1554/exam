

'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockExams } from '@/lib/mock-data';
import { ChevronRight, Search } from 'lucide-react';
import ExamCard from '@/components/exams/ExamCard';
import { useState, useMemo, useEffect } from 'react';
import type { Exam } from '@/lib/types';

const categories = [
    { 
        name: "MPPSC",
        subCategories: [
            { name: "Clerk", options: ["All", "Aptitude", "Reasoning", "English"] },
            { name: "PO", options: ["All", "Aptitude", "Reasoning", "English"] },
            { name: "Manager", options: ["All", "Aptitude", "Reasoning", "English"] },
            { name: "Officer", options: ["All", "Aptitude", "Reasoning", "English"] },
        ]
    },
    { 
        name: "Physics",
        subCategories: [
            { name: "Mechanics", options: ["All", "Kinematics", "Dynamics", "Statics"] },
            { name: "Thermodynamics", options: ["All", "Laws", "Heat Transfer"] },
        ]
    },
    { 
        name: "Chemistry",
        subCategories: [
            { name: "Organic", options: ["All", "Alkanes", "Alkenes", "Alkynes"] },
            { name: "Inorganic", options: ["All", "Acids", "Bases", "Salts"] },
        ]
    },
    { 
        name: "History",
        subCategories: [
            { name: "Ancient", options: ["All", "India", "World"] },
            { name: "Modern", options: ["All", "India", "World"] },
        ]
    },
    { 
        name: "English",
        subCategories: [
            { name: "Grammar", options: ["All", "Nouns", "Verbs", "Adjectives"] },
            { name: "Literature", options: ["All", "Poetry", "Prose"] },
        ]
    },
    { name: "Test" },
    { name: "Mocktest" }
];

const EXAMS_PER_PAGE = 15;

export default function ExamsPage() {
    // TODO: Replace with API call to fetch exams
    const [allExams, setAllExams] = useState<Exam[]>(mockExams);
    const [currentPage, setCurrentPage] = useState(1);

    const sortedExams = useMemo(() => {
        return [...allExams].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [allExams]);

    const totalPages = Math.ceil(sortedExams.length / EXAMS_PER_PAGE);
    const paginatedExams = sortedExams.slice(
        (currentPage - 1) * EXAMS_PER_PAGE,
        currentPage * EXAMS_PER_PAGE
    );

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

  return (
    <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
            <Card>
                <div className="p-2">
                    {categories.map((category, index) => (
                        <div key={category.name} className="relative group">
                             <Button 
                                variant={index === 0 ? 'default' : 'ghost'} 
                                className="w-full justify-between text-left h-auto py-2.5"
                            >
                                {category.name}
                                {category.subCategories && <ChevronRight className="h-4 w-4" />}
                            </Button>
                            {category.subCategories && (
                                <div className="absolute left-full -top-1 w-48 bg-card border rounded-md shadow-lg p-2 invisible group-hover:visible z-10">
                                   {category.subCategories.map(sub => (
                                       <div key={sub.name} className="relative group/sub">
                                            <Button variant="ghost" className="w-full justify-between text-left h-auto py-2">
                                                {sub.name}
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                            {sub.options && (
                                                <div className="absolute left-full top-0 w-48 bg-card border rounded-md shadow-lg p-2 invisible group-hover/sub:visible">
                                                    {sub.options?.map(option => (
                                                        <Button key={option} variant="ghost" className="w-full justify-start text-left h-auto py-2">{option}</Button>
                                                    ))}
                                                </div>
                                            )}
                                       </div>
                                   ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </aside>
        <section>
            <div className="flex flex-col space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search Exams..." className="pl-10 h-12" />
                </div>
                
                <div>
                <h1 className="text-2xl font-bold tracking-tight">All Exams</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {paginatedExams.map((exam, index) => (
                        <ExamCard 
                            key={exam.id} 
                            exam={exam} 
                            isFree={index % 2 === 0} 
                            price={index % 2 !== 0 ? 75 : undefined} 
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                    </div>
                )}
            </div>
        </section>
        </div>
    </div>
  );
}

    
