import PublicHeader from '@/components/layout/PublicHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const syllabusData = [
  {
    exam: 'IBPS PO',
    sections: [
      {
        name: 'Prelims',
        subjects: [
          { name: 'English Language', topics: ['Reading Comprehension', 'Cloze Test', 'Para jumbles'] },
          { name: 'Quantitative Aptitude', topics: ['Simplification/ Approximation', 'Number Series', 'Data Interpretation'] },
          { name: 'Reasoning Ability', topics: ['Puzzles', 'Seating Arrangements', 'Syllogism'] },
        ],
      },
      {
        name: 'Mains',
        subjects: [
            { name: 'Reasoning & Computer Aptitude', topics: ['Puzzles', 'Seating Arrangements', 'Internet', 'Computer Hardware'] },
            { name: 'English Language', topics: ['Reading Comprehension', 'Vocabulary', 'Grammar'] },
            { name: 'Data Analysis & Interpretation', topics: ['Bar Graph', 'Line Chart', 'Pie Chart'] },
            { name: 'General Economy & Banking Awareness', topics: ['Banking Awareness', 'Current Affairs', 'Static GK'] },
        ],
      },
    ],
  },
  {
    exam: 'TNPSC',
    sections: [
      {
        name: 'Group 1',
        subjects: [
            { name: 'General Studies', topics: ['History and Culture of India', 'Indian Polity', 'Indian Economy'] },
            { name: 'Aptitude and Mental Ability', topics: ['Simplification', 'Percentage', 'HCF and LCM'] },
        ],
      },
    ],
  },
];

export default function SyllabusPage() {
  return (
    <>
      <PublicHeader />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Syllabus</h1>
        <Card>
            <CardContent className="p-6">
                 <Accordion type="single" collapsible className="w-full">
                    {syllabusData.map(exam => (
                         <AccordionItem key={exam.exam} value={exam.exam}>
                            <AccordionTrigger className="text-xl font-semibold">{exam.exam}</AccordionTrigger>
                            <AccordionContent>
                                {exam.sections.map(section => (
                                     <div key={section.name} className="mt-4">
                                        <h3 className="text-lg font-medium text-primary">{section.name}</h3>
                                        <Accordion type="multiple" className="w-full mt-2">
                                            {section.subjects.map(subject => (
                                                <AccordionItem key={subject.name} value={subject.name}>
                                                    <AccordionTrigger>{subject.name}</AccordionTrigger>
                                                    <AccordionContent>
                                                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                                                            {subject.topics.map(topic => <li key={topic}>{topic}</li>)}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                     </div>
                                ))}
                            </AccordionContent>
                         </AccordionItem>
                    ))}
                 </Accordion>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
