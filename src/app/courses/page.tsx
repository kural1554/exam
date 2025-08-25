
import CourseCard from '@/components/courses/CourseCard';
import PublicHeader from '@/components/layout/PublicHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCourses } from '@/lib/mock-data';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  return (
    <>
      <PublicHeader />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="paid">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <TabsList>
              <TabsTrigger value="paid">Paid Courses</TabsTrigger>
              <TabsTrigger value="combo">Combo Courses</TabsTrigger>
              <TabsTrigger value="free">Free Courses</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <Select defaultValue="default">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Sort By</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Explore" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Explore</SelectItem>
                        <SelectItem value="web-dev">Web Development</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="cloud">Cloud Computing</SelectItem>
                    </SelectContent>
                </Select>
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for anything..."
                  className="pl-8 w-full"
                />
              </div>
            </div>
          </div>

          <TabsContent value="paid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="combo">
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">No Combo Courses Available</h2>
                <p className="text-muted-foreground">Please check back later.</p>
            </div>
          </TabsContent>
          <TabsContent value="free">
             <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">No Free Courses Available</h2>
                <p className="text-muted-foreground">Please check back later.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
