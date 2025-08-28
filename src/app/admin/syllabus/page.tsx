
'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SyllabusTopic {
  id: number;
  title: string;
}

interface SyllabusSubject {
  id: number;
  name: string;
  topics: SyllabusTopic[];
}

interface SyllabusSection {
  id: number;
  name: string;
  subjects: SyllabusSubject[];
}

export default function SyllabusAdminPage() {
  const [examName, setExamName] = useState('');
  const [sections, setSections] = useState<SyllabusSection[]>([]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), name: '', subjects: [] }]);
  };

  const removeSection = (sectionId: number) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const handleSectionChange = (sectionId: number, value: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, name: value } : s));
  };

  const addSubject = (sectionId: number) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, subjects: [...s.subjects, { id: Date.now(), name: '', topics: [] }] };
      }
      return s;
    }));
  };

  const removeSubject = (sectionId: number, subjectId: number) => {
     setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, subjects: s.subjects.filter(sub => sub.id !== subjectId) };
      }
      return s;
    }));
  }

  const handleSubjectChange = (sectionId: number, subjectId: number, value: string) => {
    setSections(sections.map(s => {
        if (s.id === sectionId) {
            return { ...s, subjects: s.subjects.map(sub => sub.id === subjectId ? {...sub, name: value} : sub) };
        }
        return s;
    }));
  };

  const addTopic = (sectionId: number, subjectId: number) => {
     setSections(sections.map(s => {
        if (s.id === sectionId) {
            return { ...s, subjects: s.subjects.map(sub => {
                if(sub.id === subjectId) {
                    return {...sub, topics: [...sub.topics, {id: Date.now(), title: ''}]}
                }
                return sub;
            }) };
        }
        return s;
    }));
  }

  const removeTopic = (sectionId: number, subjectId: number, topicId: number) => {
      setSections(sections.map(s => {
        if (s.id === sectionId) {
            return { ...s, subjects: s.subjects.map(sub => {
                if(sub.id === subjectId) {
                    return {...sub, topics: sub.topics.filter(t => t.id !== topicId)}
                }
                return sub;
            }) };
        }
        return s;
    }));
  }

  const handleTopicChange = (sectionId: number, subjectId: number, topicId: number, value: string) => {
       setSections(sections.map(s => {
        if (s.id === sectionId) {
            return { ...s, subjects: s.subjects.map(sub => {
                if(sub.id === subjectId) {
                    return {...sub, topics: sub.topics.map(t => t.id === topicId ? {...t, title: value} : t)}
                }
                return sub;
            }) };
        }
        return s;
    }));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Syllabus</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create New Syllabus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter Exam Name (e.g., IBPS PO)" value={examName} onChange={e => setExamName(e.target.value)} />
          
          <div className="space-y-4">
            {sections.map((section, sIdx) => (
              <Card key={section.id} className="p-4 bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                    <Input placeholder={`Section ${sIdx+1} Name (e.g., Prelims)`} value={section.name} onChange={e => handleSectionChange(section.id, e.target.value)} className="font-bold text-lg"/>
                    <Button variant="ghost" size="icon" onClick={() => removeSection(section.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>

                <div className="space-y-3 pl-4">
                    {section.subjects.map((subject, subIdx) => (
                        <Card key={subject.id} className="p-3">
                             <div className="flex justify-between items-center mb-2">
                                <Input placeholder={`Subject ${subIdx+1} Name`} value={subject.name} onChange={e => handleSubjectChange(section.id, subject.id, e.target.value)} />
                                <Button variant="ghost" size="icon" onClick={() => removeSubject(section.id, subject.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                            <div className="space-y-2 pl-4">
                                {subject.topics.map((topic, tIdx) => (
                                    <div key={topic.id} className="flex items-center gap-2">
                                        <Input placeholder={`Topic ${tIdx+1}`} value={topic.title} onChange={e => handleTopicChange(section.id, subject.id, topic.id, e.target.value)} />
                                        <Button variant="ghost" size="icon" onClick={() => removeTopic(section.id, subject.id, topic.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addTopic(section.id, subject.id)}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Topic
                                </Button>
                            </div>
                        </Card>
                    ))}
                    <Button variant="secondary" onClick={() => addSubject(section.id)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
                    </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={addSection}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Section
          </Button>

          <Button size="lg" className="w-full mt-4">Save Syllabus</Button>
        </CardContent>
      </Card>
    </div>
  );
}
