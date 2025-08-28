'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText,
  CheckSquare,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/lib/mock-data';

const tasks = [
  {
    title: 'Landing page product',
    members: 7,
    taskCount: 88,
    progress: 5.5,
    tasksDone: 97,
    tasksInProgress: 48,
    percentageCompleted: 75,
    icon: FileText,
    color: 'from-purple-500 to-indigo-500',
    textColor: 'text-purple-200',
  },
  {
    title: 'Apartement app',
    members: 7,
    taskCount: 38,
    progress: -2.8,
    tasksDone: 34,
    tasksInProgress: 75,
    percentageCompleted: 30,
    icon: Users,
    color: 'from-orange-500 to-amber-500',
    textColor: 'text-orange-200',
  },
  {
    title: 'Learning app',
    members: 7,
    taskCount: 56,
    progress: 0,
    tasksDone: 45,
    tasksInProgress: 11,
    percentageCompleted: 60,
    icon: CheckSquare,
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-200',
  },
];

const progressData = [
  { name: '26 August', value: 3.5 },
  { name: '27 August', value: 5 },
  { name: '28 August', value: 4.2 },
  { name: '29 August', value: 8 },
  { name: '30 August', value: 6 },
];

const teachers = [
    { name: 'Mrs. Roses', subject: 'Prototyping', rating: 4.9, avatar: 'https://placehold.co/100x100?text=R' },
    { name: 'Mrs. Angel', subject: 'UI Interaction', rating: 4.7, avatar: 'https://placehold.co/100x100?text=A' },
    { name: 'Mr. Richard', subject: 'Website design', rating: 4.5, avatar: 'https://placehold.co/100x100?text=R' },
]

export default function UserDashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Good morning {mockUser.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">Do your best for this week</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My task</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card
              key={task.title}
              className={`text-white bg-gradient-to-br ${task.color} shadow-lg`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <task.icon className="h-4 w-4" />
                            <span>{task.title}</span>
                        </div>
                        <p className="text-xs text-white/70">{task.members} members</p>
                    </div>
                     <div className="w-24 h-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={progressData}>
                                <Line type="monotone" dataKey="value" stroke="rgba(255,255,255,0.5)" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                     </div>
                </div>
                
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{task.taskCount} task</div>
                <div className="text-sm flex items-center gap-4 mt-4 text-white/80">
                    <span>{task.tasksDone} task done</span>
                    <span>{task.tasksInProgress} task done</span>
                    <span>{task.percentageCompleted}% completed</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
           <Card>
                <CardHeader>
                    <CardTitle>My progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{
                                    background: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }} />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 6, fill: 'hsl(var(--primary))' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
           </Card>
           <Card>
                <CardHeader>
                    <CardTitle>Best teacher</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {teachers.map(teacher => (
                        <div key={teacher.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{teacher.name}</p>
                                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-bold">{teacher.rating}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
           </Card>
        </div>
      </div>
    </>
  );
}
