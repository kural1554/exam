// app/admin/category/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
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
  MoreVertical,
  PlusCircle,
  Home,
  ChevronRight,
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
// Import all the necessary API functions
import { getExamTitles, getCategories, createCategory, updateCategory, deleteCategory } from '@/services/api'; 
import type { Category } from '@/lib/types'; // Make sure Category type is defined in types.ts
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ExamTitle {
    id: number;
    name: string;
}

export default function AdminCategoryPage() {
    // --- STATE MANAGEMENT ---
    const [examTitles, setExamTitles] = useState<ExamTitle[]>([]);
    const [categories, setCategories] =  useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // State for Create Dialog
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedExamTitle, setSelectedExamTitle] = useState('');

    // State for Edit Dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [titlesData, categoriesData] = await Promise.all([
                getExamTitles(),
                getCategories()
            ]);
            if (Array.isArray(titlesData)) setExamTitles(titlesData);
            if (Array.isArray(categoriesData)) setCategories(categoriesData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast.error("Could not load data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- CRUD HANDLERS ---

    // CREATE
    const handleCreateCategory = async () => {
        if (!newCategoryName || !selectedExamTitle) {
            toast.error("Exam Title and Name are required.");
            return;
        }
        try {
            await createCategory({
                name: newCategoryName,
                exam_title: parseInt(selectedExamTitle)
            });
            toast.success("Category created successfully!");
            setIsCreateDialogOpen(false);
            setNewCategoryName('');
            setSelectedExamTitle('');
            await fetchData();
        } catch (error) {
            console.error("Failed to create category:", error);
            toast.error("Failed to create category.");
        }
    };
    
    // DELETE
    const handleDeleteCategory = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            const response = await deleteCategory(id);
            if (response.ok) {
                toast.success("Category deleted successfully!");
                await fetchData();
            } else {
                toast.error("Failed to delete category.");
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
            toast.error("An error occurred while deleting.");
        }
    };

    // UPDATE (Part 1: Open Dialog)
    const handleOpenEditDialog = (category: Category) => {
        setEditingCategory(category);
        setIsEditDialogOpen(true);
    };

    // UPDATE (Part 2: Handle form input changes)
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingCategory) return;
        setEditingCategory({ ...editingCategory, name: e.target.value });
    };

    const handleEditSelectChange = (value: string) => {
        if (!editingCategory) return;
        setEditingCategory({ ...editingCategory, exam_title: parseInt(value) });
    };

    // UPDATE (Part 3: Submit form)
    const handleUpdateCategory = async () => {
        if (!editingCategory) return;
        try {
            const response = await updateCategory(editingCategory.id, {
                name: editingCategory.name,
                exam_title: editingCategory.exam_title
            });

            if (response.ok) {
                toast.success("Category updated successfully!");
                setIsEditDialogOpen(false);
                setEditingCategory(null);
                await fetchData();
            } else {
                toast.error("Failed to update category.");
            }
        } catch (error) {
            console.error("Failed to update category:", error);
            toast.error("An error occurred during the update.");
        }
    };

    // --- JSX RENDER ---
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Categories</h1>
            </div>
            
            <div className="text-right">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Category</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="exam_title" className="text-right">Exam Title</Label>
                                <Select value={selectedExamTitle} onValueChange={setSelectedExamTitle}>
                                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select an exam title" /></SelectTrigger>
                                    <SelectContent>
                                        {examTitles.map((title) => (
                                            <SelectItem key={title.id} value={String(title.id)}>{title.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleCreateCategory}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader><CardTitle>Category List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Exam Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                            ) : (
                                categories.map((category) => {
                                    const examTitle = examTitles.find(t => t.id === category.exam_title);
                                    return (
                                        <TableRow key={category.id}>
                                            <TableCell>{category.id}</TableCell>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell><Badge variant="secondary">{examTitle ? examTitle.name : 'N/A'}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(category)}>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCategory(category.id)}>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* --- Edit Category Dialog --- */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    {editingCategory && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-exam_title" className="text-right">Exam Title</Label>
                                <Select value={String(editingCategory.exam_title)} onValueChange={handleEditSelectChange}>
                                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {examTitles.map((title) => (
                                            <SelectItem key={title.id} value={String(title.id)}>{title.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Name</Label>
                                <Input id="edit-name" value={editingCategory.name} onChange={handleEditFormChange} className="col-span-3" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleUpdateCategory}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}