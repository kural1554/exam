// app/admin/exam-title/page.tsx

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
import {
  MoreVertical,
  PlusCircle,
  Home,
  ChevronRight,
} from 'lucide-react';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from '@/components/ui/table';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Import all your API functions
import { getExamTitles, createExamTitle, deleteExamTitle, updateExamTitle } from '@/services/api';

// Define the type for an exam title to avoid errors
interface ExamTitle {
    id: number;
    name: string;
    row_order: number;
}

export default function AdminExamTitlePage() {
    // --- STATE MANAGEMENT ---
    const [examTitles, setExamTitles] = useState<ExamTitle[]>([]);
    const [loading, setLoading] = useState(true);
    
    // State for Create Dialog
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newTitleName, setNewTitleName] = useState('');
    const [newTitleOrder, setNewTitleOrder] = useState(0);

    // State for Edit Dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTitle, setEditingTitle] = useState<ExamTitle | null>(null);

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getExamTitles();
            if(Array.isArray(data)) {
                setExamTitles(data);
            } else {
                setExamTitles([]);
                console.error("API did not return an array for exam titles:", data);
            }
        } catch (error) {
            console.error("Failed to fetch exam titles:", error);
            toast.error("Could not load exam titles.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- CRUD HANDLERS ---

    // CREATE
    const handleCreateTitle = async () => {
        if (!newTitleName) {
            toast.error("Title name cannot be empty.");
            return;
        }
        try {
            await createExamTitle({
                name: newTitleName,
                row_order: newTitleOrder,
            });
            toast.success("Exam Title created successfully!");
            setIsCreateDialogOpen(false);
            setNewTitleName('');
            setNewTitleOrder(0);
            await fetchData();
        } catch (error) {
            console.error("Failed to create exam title:", error);
            toast.error("Failed to create exam title.");
        }
    };
    
    // DELETE
    const handleDeleteTitle = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this exam title?")) {
            return;
        }
        try {
            const response = await deleteExamTitle(id);
            if (response.ok) {
                toast.success("Exam Title deleted successfully!");
                await fetchData();
            } else {
                const errorData = await response.json();
                toast.error(`Failed to delete: ${errorData.detail || 'Server error'}`);
            }
        } catch (error) {
            console.error("Failed to delete exam title:", error);
            toast.error("An error occurred while deleting the exam title.");
        }
    };

    // UPDATE (Part 1: Open the dialog)
    const handleOpenEditDialog = (title: ExamTitle) => {
        setEditingTitle(title);
        setIsEditDialogOpen(true);
    };

    // UPDATE (Part 2: Handle form input changes)
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingTitle) return;
        const { name, value } = e.target;
        setEditingTitle({
            ...editingTitle,
            [name]: name === 'row_order' ? Number(value) : value,
        });
    };

    // UPDATE (Part 3: Submit the form)
    const handleUpdateTitle = async () => {
        if (!editingTitle) return;
        try {
            const response = await updateExamTitle(editingTitle.id, {
                name: editingTitle.name,
                row_order: editingTitle.row_order
            });
            if (response.ok) {
                toast.success("Exam Title updated successfully!");
                setIsEditDialogOpen(false);
                setEditingTitle(null);
                await fetchData();
            } else {
                const errorData = await response.json();
                toast.error(`Update failed: ${errorData.name || errorData.detail || 'Server error'}`);
            }
        } catch (error) {
            console.error("Failed to update exam title:", error);
            toast.error("An error occurred during the update.");
        }
    };

    // --- JSX RENDER ---
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Exam Titles</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href="/admin" className="flex items-center gap-1 hover:text-primary"><Home className="h-4 w-4" /> Dashboard</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>Exam Titles</span>
                </div>
            </div>
            
            <div className="text-right">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Exam Title
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Exam Title</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new exam title.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input 
                                    id="name" 
                                    placeholder="e.g., TNPSC Group 4" 
                                    className="col-span-3" 
                                    value={newTitleName}
                                    onChange={(e) => setNewTitleName(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="row_order" className="text-right">
                                    Row Order
                                </Label>
                                <Input 
                                    id="row_order" 
                                    type="number" 
                                    placeholder="0" 
                                    className="col-span-3" 
                                    value={newTitleOrder}
                                    onChange={(e) => setNewTitleOrder(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleCreateTitle}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Exam Title List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Row Order</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                                    </TableRow>
                                ) : (
                                    examTitles.map((title) => (
                                        <TableRow key={title.id}>
                                            <TableCell>{title.id}</TableCell>
                                            <TableCell className="font-medium">{title.name}</TableCell>
                                            <TableCell>{title.row_order}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {/* CORRECTED: onClick handler added here */}
                                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(title)}>
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDeleteTitle(title.id)}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* CORRECTED: Edit Dialog is now outside the table, at the main level */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Exam Title</DialogTitle>
                        <DialogDescription>
                            Make changes to your exam title here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {editingTitle && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="edit-name"
                                    name="name" // The 'name' attribute is important
                                    value={editingTitle.name}
                                    onChange={handleEditFormChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-row_order" className="text-right">
                                    Row Order
                                </Label>
                                <Input
                                    id="edit-row_order"
                                    name="row_order"
                                    type="number"
                                    value={editingTitle.row_order}
                                    onChange={handleEditFormChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleUpdateTitle}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}