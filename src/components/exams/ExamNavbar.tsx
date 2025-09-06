
'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function ExamNavbar() {
  // In a real app, these values would come from state and have onChange handlers.
  // For now, they are just for visual representation.
  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-end gap-x-6">
        <div className="flex items-center gap-x-2">
          <Label htmlFor="text-size" className="text-primary-foreground">Text Size</Label>
          <Select defaultValue="large">
            <SelectTrigger
              id="text-size"
              className="w-[120px] bg-background text-foreground focus:ring-ring"
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="view-in" className="text-primary-foreground">View in:</Label>
           <Select defaultValue="english">
            <SelectTrigger
              id="view-in"
              className="w-[120px] bg-background text-foreground focus:ring-ring"
            >
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
}
