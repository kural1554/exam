// app/admin/sub-category/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Import all necessary API functions
import { getCategories, getSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } from '@/services/api'; 

// Import the types for better code safety
import type { Category, SubCategory } from '@/lib/types';

// ... other imports ...
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreVertical, PlusCircle, Home, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';


export default function AdminSubCategoryPage() {
    // --- STATE MANAGEMENT ---
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // State for Create Dialog
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // State for Edit Dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [catsData, subCatsData] = await Promise.all([
                getCategories(),
                getSubcategories()
            ]);
            if (Array.isArray(catsData)) setCategories(catsData);
            if (Array.isArray(subCatsData)) setSubCategories(subCatsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
            toast.error("Could not load data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- CRUD HANDLERS ---
    
    // CREATE
    const handleCreateSubCategory = async () => {
        if (!newSubCategoryName || !selectedCategory) {
            toast.error("Parent Category and Name are required.");
            return;
        }
        try {
            await createSubcategory({
                name: newSubCategoryName,
                category: parseInt(selectedCategory)
            });
            toast.success("Sub-category created successfully!");
            setIsCreateDialogOpen(false);
            setNewSubCategoryName('');
            setSelectedCategory('');
            await fetchData();
        } catch (error) {
            toast.error("Failed to create sub-category.");
        }
    };

    // DELETE
    const handleDeleteSubCategory = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this sub-category?")) {
            return;
        }
        try {
            const response = await deleteSubcategory(id);
            if (response.ok) {
                toast.success("Sub-category deleted successfully!");
                await fetchData();
            } else {
                toast.error("Failed to delete sub-category.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    // UPDATE (Part 1: Open Dialog)
    const handleOpenEditDialog = (subCategory: SubCategory) => {
        setEditingSubCategory(subCategory);
        setIsEditDialogOpen(true);
    };

    // UPDATE (Part 2: Handle form input changes)
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingSubCategory) return;
        setEditingSubCategory({ ...editingSubCategory, name: e.target.value });
    };

    const handleEditSelectChange = (value: string) => {
        if (!editingSubCategory) return;
        setEditingSubCategory({ ...editingSubCategory, category: parseInt(value) });
    };

    // UPDATE (Part 3: Submit form)
    const handleUpdateSubCategory = async () => {
        if (!editingSubCategory) return;
        try {
            const response = await updateSubcategory(editingSubCategory.id, {
                name: editingSubCategory.name,
                category: editingSubCategory.category
            });
            if (response.ok) {
                toast.success("Sub-category updated successfully!");
                setIsEditDialogOpen(false);
                setEditingSubCategory(null);
                await fetchData();
            } else {
                toast.error("Failed to update sub-category.");
            }
        } catch (error) {
            toast.error("An error occurred during the update.");
        }
    };

    // --- JSX RENDER ---
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Sub Categories</h1>
            </div>
            
            <div className="text-right">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Sub Category</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Sub Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Parent Category</Label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a category" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleCreateSubCategory}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader><CardTitle>Sub Category List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Parent Category</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                            ) : (
                                subCategories.map((subCategory) => {
                                    const parentCategory = categories.find(cat => cat.id === subCategory.category);
                                    return (
                                        <TableRow key={subCategory.id}>
                                            <TableCell>{subCategory.id}</TableCell>
                                            <TableCell className="font-medium">{subCategory.name}</TableCell>
                                            <TableCell><Badge variant="secondary">{parentCategory ? parentCategory.name : 'N/A'}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(subCategory)}>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteSubCategory(subCategory.id)}>Delete</DropdownMenuItem>
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

            {/* --- Edit Sub-Category Dialog --- */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Sub Category</DialogTitle>
                    </DialogHeader>
                    {editingSubCategory && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">Parent Category</Label>
                                <Select value={String(editingSubCategory.category)} onValueChange={handleEditSelectChange}>
                                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Name</Label>
                                <Input id="edit-name" value={editingSubCategory.name} onChange={handleEditFormChange} className="col-span-3" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleUpdateSubCategory}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}