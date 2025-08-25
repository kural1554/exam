
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Course } from '@/lib/types';
import { Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const originalPrice = course.price * 1.35;
    const discount = originalPrice - course.price;
    const discountPercentage = Math.round((discount / originalPrice) * 100);


  return (
    <Link href="#" className="group">
        <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        <div className="relative h-40 w-full">
            <Image
            src={course.image.src}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={course.image.hint}
            />
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white border-transparent">
            {course.type}
            </Badge>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="text-md font-semibold leading-snug group-hover:text-primary transition-colors flex-grow">{course.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Clock className="h-4 w-4 mr-1.5" />
                {course.duration} Hrs
                <span className="mx-2">·</span>
                <span>{course.language}</span>
            </div>
            <div className="mt-2">
                <span className="text-lg font-bold text-foreground">₹{course.price}/-</span>
                <span className="text-sm text-muted-foreground line-through ml-2">₹{originalPrice.toFixed(0)}/-</span>
            </div>
        </CardContent>
        <CardFooter className="p-0">
             <div className="w-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 text-xs font-medium text-center p-2">
                You save ₹{discount.toFixed(0)} ({discountPercentage}% Off)
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
