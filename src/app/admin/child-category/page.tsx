

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
import { mockChildCategories, mockSubCategories, mockCategories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminChildCategoryPage() {
    const childCategories = mockChildCategories;
    const subCategories = mockSubCategories;
    const categories = mockCategories;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create and Manage Child Category</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/admin" className="flex items-center gap-1 hover:text-primary"><Home className="h-4 w-4" /> Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <span>Child Category</span>
            </div>
        </div>
        
        <div className="text-right">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Child Category
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Child Category</DialogTitle>
                        <DialogDescription>
                             Select a category and sub category, then enter the name for the new child category.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="main-category" className="text-right">
                                Category
                            </Label>
                             <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.slug || category.name.toLowerCase()}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sub-category" className="text-right">
                                Sub Category
                            </Label>
                             <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a sub category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories.map((category) => (
                                        <SelectItem key={category.id} value={category.slug || category.name.toLowerCase()}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" placeholder="Child Category Name" className="col-span-3" />
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
                        <CardTitle>Child Category List</CardTitle>
                        <div className="flex items-center gap-2">
                             <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[160px] bg-background">
                                    <SelectValue placeholder="Select Sub Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sub Categories</SelectItem>
                                    <SelectItem value="cotton">Cotton</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                    <SelectItem value="fitness">Fitness</SelectItem>
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
                                    <TableHead>Sub Category</TableHead>
                                    <TableHead>Row Order</TableHead>
                                    <TableHead className="text-right">Operate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {childCategories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Cotton</Badge>
                                        </TableCell>
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
                    <CardTitle>Child Category Order</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                     <Select defaultValue="cotton">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Sub Category" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="cotton">Cotton</SelectItem>
                           <SelectItem value="news">News</SelectItem>
                           <SelectItem value="fitness">Fitness</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="mt-4 space-y-2">
                        {childCategories
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
