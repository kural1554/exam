// app/admin/child-category/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Import all necessary API functions
import { getSubcategories, getChildCategories, createChildCategory, updateChildCategory, deleteChildCategory } from '@/services/api'; 

// Import the types for better code safety
import type { SubCategory, ChildCategory } from '@/lib/types';

// ... other imports ...
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, PlusCircle, Home, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminNewChildCategoryPage() {
    // --- STATE MANAGEMENT ---
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // State for Create Dialog
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newChildCategoryName, setNewChildCategoryName] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // State for Edit Dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingChildCategory, setEditingChildCategory] = useState<ChildCategory | null>(null);

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [subCatsData, childCatsData] = await Promise.all([
                getSubcategories(),
                getChildCategories()
            ]);
            if (Array.isArray(subCatsData)) setSubCategories(subCatsData);
            if (Array.isArray(childCatsData)) setChildCategories(childCatsData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
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
    const handleCreateChildCategory = async () => {
        if (!newChildCategoryName || !selectedSubCategory) {
            toast.error("Sub Category and Name are required.");
            return;
        }
        try {
            await createChildCategory({
                name: newChildCategoryName,
                sub_category: parseInt(selectedSubCategory)
            });
            toast.success("Child category created successfully!");
            setIsCreateDialogOpen(false);
            setNewChildCategoryName('');
            setSelectedSubCategory('');
            await fetchData();
        } catch (error) {
            toast.error("Failed to create child category.");
        }
    };

    // DELETE
    const handleDeleteChildCategory = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this child category?")) {
            return;
        }
        try {
            const response = await deleteChildCategory(id);
            if (response.ok) {
                toast.success("Child category deleted successfully!");
                await fetchData();
            } else {
                toast.error("Failed to delete child category.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    // UPDATE (Part 1: Open Dialog)
    const handleOpenEditDialog = (childCategory: ChildCategory) => {
        setEditingChildCategory(childCategory);
        setIsEditDialogOpen(true);
    };

    // UPDATE (Part 2: Handle form input changes)
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingChildCategory) return;
        setEditingChildCategory({ ...editingChildCategory, name: e.target.value });
    };
    
    const handleEditSelectChange = (value: string) => {
        if (!editingChildCategory) return;
        setEditingChildCategory({ ...editingChildCategory, sub_category: parseInt(value) });
    };

    // UPDATE (Part 3: Submit form)
    const handleUpdateChildCategory = async () => {
        if (!editingChildCategory) return;
        try {
            const response = await updateChildCategory(editingChildCategory.id, {
                name: editingChildCategory.name,
                sub_category: editingChildCategory.sub_category
            });
            if (response.ok) {
                toast.success("Child category updated successfully!");
                setIsEditDialogOpen(false);
                setEditingChildCategory(null);
                await fetchData();
            } else {
                toast.error("Failed to update child category.");
            }
        } catch (error) {
            toast.error("An error occurred during the update.");
        }
    };

    // --- JSX RENDER ---
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Child Categories</h1>
            </div>
            
            <div className="text-right">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Child Category</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Child Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sub-category" className="text-right">Sub Category</Label>
                                <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a sub category" /></SelectTrigger>
                                    <SelectContent>
                                        {subCategories.map((subCat) => (
                                            <SelectItem key={subCat.id} value={String(subCat.id)}>{subCat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newChildCategoryName} onChange={(e) => setNewChildCategoryName(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleCreateChildCategory}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader><CardTitle>Child Category List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Sub Category</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                            ) : (
                                childCategories.map((childCat) => {
                                    const parentSubCategory = subCategories.find(sc => sc.id === childCat.sub_category);
                                    return (
                                        <TableRow key={childCat.id}>
                                            <TableCell>{childCat.id}</TableCell>
                                            <TableCell className="font-medium">{childCat.name}</TableCell>
                                            <TableCell><Badge variant="secondary">{parentSubCategory ? parentSubCategory.name : 'N/A'}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(childCat)}>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteChildCategory(childCat.id)}>Delete</DropdownMenuItem>
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

            {/* --- Edit Child Category Dialog --- */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Child Category</DialogTitle>
                    </DialogHeader>
                    {editingChildCategory && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-sub_category" className="text-right">Sub Category</Label>
                                <Select value={String(editingChildCategory.sub_category)} onValueChange={handleEditSelectChange}>
                                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {subCategories.map((subCat) => (
                                            <SelectItem key={subCat.id} value={String(subCat.id)}>{subCat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Name</Label>
                                <Input id="edit-name" value={editingChildCategory.name} onChange={handleEditFormChange} className="col-span-3" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleUpdateChildCategory}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}