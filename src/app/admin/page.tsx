
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  Users,
  BookOpen,
  DollarSign,
  ArrowRight,
  PlusCircle,
  FilePenLine,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { title: 'Total Users', value: '1,250', icon: Users, change: '+15.2%', changeType: 'increase' },
  { title: 'Exams Created', value: '78', icon: BookOpen, change: '+5', changeType: 'increase' },
  { title: 'Total Revenue', value: '$12,850', icon: DollarSign, change: '-3.1%', changeType: 'decrease' },
  { title: 'Pending Reviews', value: '12', icon: Activity, change: '+2', changeType: 'increase' },
];

const recentActivities = [
    { user: 'Priya Sharma', action: 'completed the', item: 'Algebra Fundamentals exam', time: '2 minutes ago' },
    { user: 'Admin', action: 'added a new course:', item: 'Advanced Calculus', time: '1 hour ago' },
    { user: 'Arjun Kumar', action: 'registered as a new user.', item: '', time: '3 hours ago' },
    { user: 'Admin', action: 'deleted the exam:', item: 'Old History Test', time: '1 day ago' },
];

const quickActions = [
    { label: 'Add New Exam', href: '/admin/exams', icon: PlusCircle },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Edit Syllabus', href: '/admin/syllabus', icon: FilePenLine },
    { label: 'Global Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change} from last month
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of recent activities across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 text-sm">
                            <Activity className="h-5 w-5 text-primary mt-1" />
                            <div>
                                <p>
                                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-semibold text-primary">{activity.item}</span>
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Quick links to common admin tasks.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                {quickActions.map(action => (
                    <Button key={action.label} asChild variant="outline" className="justify-start">
                        <Link href={action.href}>
                            <action.icon className="mr-2 h-4 w-4" />
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
