import ExamCard from '@/components/exams/ExamCard';
import { mockExams } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const categories = [
    "MPPSC",
    "Physics",
    "Chemistry Category",
    "History Category",
    "Chemistry",
    "English Category",
    "Test",
    "mocktest"
];

export default function ExamsPage() {
  return (
    <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <aside>
            <Card>
                <ScrollArea className="h-full">
                    <div className="p-2">
                        {categories.map((category, index) => (
                            <Button 
                                key={category} 
                                variant={index === 0 ? 'default' : 'ghost'} 
                                className="w-full justify-start text-left h-auto py-2.5"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
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
            </div>
        </section>
        </div>
    </div>
  );
}
