
'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExamNavbarProps {
    textSize: string;
    onTextSizeChange: (size: string) => void;
    language: string;
    onLanguageChange: (lang: string) => void;
}

export default function ExamNavbar({ 
    textSize, 
    onTextSizeChange, 
    language, 
    onLanguageChange 
}: ExamNavbarProps) {
  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-end gap-x-6">
        <div className="flex items-center gap-x-2">
          <Label htmlFor="text-size" className="text-primary-foreground">Text Size</Label>
          <Select value={textSize} onValueChange={onTextSizeChange}>
            <SelectTrigger
              id="text-size"
              className="w-[120px] bg-background text-foreground focus:ring-ring"
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-sm">Small</SelectItem>
              <SelectItem value="text-lg">Normal</SelectItem>
              <SelectItem value="text-2xl">Big</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="view-in" className="text-primary-foreground">View in:</Label>
           <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger
              id="view-in"
              className="w-[120px] bg-background text-foreground focus:ring-ring"
            >
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
}
