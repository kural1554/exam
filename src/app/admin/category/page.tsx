

'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MoreVertical,
  PlusCircle,
  Home,
  ChevronRight,
  RefreshCw,
  List,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from '@/components/ui/table';
import Image from 'next/image';
import { mockCategories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminCategoryPage() {
    const categories = mockCategories;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create and Manage Exam Title</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/admin" className="flex items-center gap-1 hover:text-primary"><Home className="h-4 w-4" /> Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <span>Exam Title</span>
            </div>
        </div>
        
        <div className="text-right">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Exam Title
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Exam Title</DialogTitle>
                        <DialogDescription>
                            Enter the name for the new exam title below. Click submit when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" placeholder="Exam Title" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader className="bg-muted/50">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <CardTitle>Exam Title List</CardTitle>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="en-us">
                                <SelectTrigger className="w-full sm:w-[160px] bg-background">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en-us">English (US)</SelectItem>
                                    <SelectItem value="ta-in">Tamil (India)</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-grow sm:flex-grow-0">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8 bg-background" />
                            </div>
                             <Button variant="outline" size="icon">
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                             <Button variant="outline" size="icon">
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Row Order</TableHead>
                                    <TableHead className="text-right">Operate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>
                                            <Badge className={cn("bg-yellow-400 text-yellow-900 hover:bg-yellow-500")}>
                                                {category.rowOrder}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="bg-foreground text-background hover:bg-foreground/80">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader className="bg-muted/50">
                    <CardTitle>Exam Title Order</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                     <Select defaultValue="en-us">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en-us">English (US)</SelectItem>
                            <SelectItem value="ta-in">Tamil (India)</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="mt-4 space-y-2">
                        {categories
                            .sort((a, b) => a.rowOrder - b.rowOrder)
                            .map((category, index) => (
                            <div key={category.id} className="flex items-center p-3 bg-muted/30 rounded-md">
                                <span className="text-sm font-medium text-muted-foreground mr-4">{index + 1}.</span>
                                <span className="text-sm">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
