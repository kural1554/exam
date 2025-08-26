import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    Activity,
    BookUser,
    GraduationCap,
    Library,
    Users,
    Eye,
  } from 'lucide-react';
  import Link from 'next/link';
  import { Button } from '@/components/ui/button';
  import Image from 'next/image';
  
  const stats = [
    {
      title: 'Total Students',
      value: '1,385',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Total Dons',
      value: '100',
      icon: BookUser,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Total Faculties',
      value: '50',
      icon: GraduationCap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Total Depts',
      value: '120',
      icon: Library,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    },
  ];
  
  const lectures = [
    {
      title: 'Introductory Note to Physics',
      doctor: 'Dr. Benson Akoade',
      time: '9:00 am - 10:00 am',
      views: 225,
      image: 'https://placehold.co/100x100?text=tiger',
      imageHint: 'tiger',
    },
    {
      title: 'Introductory Note to Physics',
      doctor: 'Dr. Benson Akoade',
      time: '9:00 am - 10:00 am',
      views: 225,
      image: 'https://placehold.co/100x100?text=flowers',
      imageHint: 'flowers',
    },
    {
      title: 'Introductory Note to Physics',
      doctor: 'Dr. Benson Akoade',
      time: '9:00 am - 10:00 am',
      views: 225,
      image: 'https://placehold.co/100x100?text=stationery',
      imageHint: 'stationery',
    },
    {
      title: 'Introductory Note to Physics',
      doctor: 'Dr. Benson Akoade',
      time: '9:00 am - 10:00 am',
      views: 225,
      image: 'https://placehold.co/100x100?text=abstract',
      imageHint: 'abstract art',
    },
    {
      title: 'Introductory Note to Physics',
      doctor: 'Dr. Benson Akoade',
      time: '9:00 am - 10:00 am',
      views: 225,
      image: 'https://placehold.co/100x100?text=pancakes',
      imageHint: 'pancakes',
    },
  ];

  const upcomingLectures = [
    {
        title: 'Introductory Note to Physics',
        doctor: 'Dr. Benson Akoade',
        time: '9:00 am - 10:00 am',
        duration: 'In 2 hrs, 15 mins',
        image: 'https://placehold.co/100x100?text=teacher',
        imageHint: 'teacher',
      },
      {
        title: 'Introductory Note to Physics',
        doctor: 'Dr. Benson Akoade',
        time: '9:00 am - 10:00 am',
        duration: 'In 2 hrs, 15 mins',
        image: 'https://placehold.co/100x100?text=student',
        imageHint: 'student',
      },
      {
        title: 'Introductory Note to Physics',
        doctor: 'Dr. Benson Akoade',
        time: '9:00 am - 10:00 am',
        duration: 'In 2 hrs, 15 mins',
        image: 'https://placehold.co/100x100?text=tree',
        imageHint: 'tree',
      },
      {
        title: 'Introductory Note to Physics',
        doctor: 'Dr. Benson Akoade',
        time: '9:00 am - 10:00 am',
        duration: 'In 2 hrs, 15 mins',
        image: 'https://placehold.co/100x100?text=person',
        imageHint: 'person',
      },
      {
        title: 'Introductory Note to Physics',
        doctor: 'Dr. Benson Akoade',
        time: '9:00 am - 10:00 am',
        duration: 'In 2 hrs, 15 mins',
        image: 'https://placehold.co/100x100?text=desk',
        imageHint: 'desk',
      },
  ]
  
  export default function AdminPage() {
    return (
      <>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center rounded-full w-12 h-12 ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Ongoing Lectures</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  Go to Calendar
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              {lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image src={lecture.image} alt={lecture.title} layout="fill" objectFit="cover" data-ai-hint={lecture.imageHint} />
                    </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {lecture.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lecture.doctor}
                    </p>
                    <p className="text-xs text-muted-foreground">{lecture.time}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {lecture.views}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Upcoming Lectures</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  Go to Calendar
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
            {upcomingLectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image src={lecture.image} alt={lecture.title} layout="fill" objectFit="cover" data-ai-hint={lecture.imageHint} />
                    </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {lecture.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lecture.doctor}
                    </p>
                    <p className="text-xs text-muted-foreground">{lecture.time}</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {lecture.duration}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
  