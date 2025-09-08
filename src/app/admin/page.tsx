
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
  PlusCircle,
  FilePenLine,
  Settings,
  Clock,
  UserPlus,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell, Legend, Tooltip, CartesianGrid } from 'recharts';
import { mockAnalyticsData } from '@/lib/mock-data';
import { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { getAllUsers } from '@/services/api';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

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

const GENDER_COLORS = {
    male: '#3B82F6',
    female: '#EC4899',
    other: '#A855F7',
};

const STATE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];


export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then(fetchedUsers => {
        setUsers(fetchedUsers);
        setIsLoading(false);
    });
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin h-8 w-8"/></div>
  }

  const genderData = users.reduce((acc, user) => {
    const gender = user.gender || 'other';
    const existing = acc.find(item => item.name === gender);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: gender, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]).map(item => ({...item, name: item.name.charAt(0).toUpperCase() + item.name.slice(1)}));
  
  const stateData = users.reduce((acc, user) => {
    const state = user.state || 'Unknown';
    const existing = acc.find(item => item.name === state);
    if(existing) {
        existing.users += 1;
    } else {
        acc.push({ name: state, users: 1 });
    }
    return acc;
  }, [] as { name: string, users: number }[]);

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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
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

      <div>
        <h2 className="text-2xl font-bold mb-4">User Analytics</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
             <Card>
                <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                    <CardDescription>User demographics by gender.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5}>
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[entry.name.toLowerCase() as keyof typeof GENDER_COLORS]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Users by State</CardTitle>
                    <CardDescription>User distribution across different states.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stateData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="users" fill="#8884d8">
                                     {stateData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={STATE_COLORS[index % STATE_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 mt-6">Website Analytics</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Top Pages by Engagement</CardTitle>
                    <CardDescription>Your most engaging pages based on time spent.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        {mockAnalyticsData.topPages.map(page => (
                            <li key={page.path} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{page.path}</p>
                                    <p className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</p>
                                </div>
                                <span className="font-semibold text-primary">{page.avgTime}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockAnalyticsData.engagement.avgSessionDuration}</div>
                    <p className="text-xs text-muted-foreground">Avg. session duration</p>
                    <div className="mt-4 h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockAnalyticsData.engagement.sessionsByDay}>
                                <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">New Users</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{mockAnalyticsData.newUsers.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                        +{mockAnalyticsData.newUsers.changePercentage}% from last month
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {mockAnalyticsData.newUsers.recentAvatars.map((avatar, index) => (
                                <img key={index} src={avatar} alt="User" className="h-6 w-6 rounded-full border-2 border-background" />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">and others...</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
