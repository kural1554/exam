
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockExams } from '@/lib/mock-data';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import ExamCard from '@/components/exams/ExamCard';

const categories = [
    { 
        name: "MPPSC",
        subCategories: [
            { name: "Clerk", options: ["Aptitude", "Reasoning", "English"] },
            { name: "PO", options: ["Aptitude", "Reasoning", "English"] },
            { name: "Manager", options: ["Aptitude", "Reasoning", "English"] },
            { name: "Officer", options: ["Aptitude", "Reasoning", "English"] },
        ]
    },
    { 
        name: "Physics",
        subCategories: [
            { name: "Mechanics", options: ["Kinematics", "Dynamics", "Statics"] },
            { name: "Thermodynamics", options: ["Laws", "Heat Transfer"] },
        ]
    },
    { 
        name: "Chemistry",
        subCategories: [
            { name: "Organic", options: ["Alkanes", "Alkenes", "Alkynes"] },
            { name: "Inorganic", options: ["Acids", "Bases", "Salts"] },
        ]
    },
    { 
        name: "History",
        subCategories: [
            { name: "Ancient", options: ["India", "World"] },
            { name: "Modern", options: ["India", "World"] },
        ]
    },
    { 
        name: "English",
        subCategories: [
            { name: "Grammar", options: ["Nouns", "Verbs", "Adjectives"] },
            { name: "Literature", options: ["Poetry", "Prose"] },
        ]
    },
    { name: "Test" },
    { name: "Mocktest" }
];

export default function ExamsPage() {
  return (
    <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
            <Card>
                <div className="p-4">
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
                <h1 className="text-2xl font-bold tracking-tight">MPPSC Exams</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {mockExams.map((exam, index) => (
                        <ExamCard 
                            key={exam.id} 
                            exam={exam} 
                            isFree={index % 2 === 0} 
                            price={index % 2 !== 0 ? 75 : undefined} 
                        />
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4">
                    <Button variant="outline">Previous</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </section>
        </div>
    </div>
  );
}
