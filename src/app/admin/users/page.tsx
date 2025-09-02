
'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpDown,
  Search,
  Upload,
  PlusCircle,
  MoreHorizontal,
  Eye,
  Trash,
  Pencil,
  Loader2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers } from '@/services/api';
import type { User } from '@/lib/types';

interface UserWithDetails extends User {
    username: string;
    phone: string;
    dateCreated: string;
    status: 'Active' | 'Inactive';
}

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const data = await getAllUsers();
              const detailedUsers = data.map(u => ({
                  ...u,
                  username: u.email.split('@')[0],
                  phone: '0812-xxxx-xxxx',
                  dateCreated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
                  status: Math.random() > 0.3 ? 'Active' : 'Inactive'
              })) as UserWithDetails[];
              setUsers(detailedUsers);
          } catch(error) {
              toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: 'Failed to fetch users.'
              })
          } finally {
              setIsLoading(false);
          }
      }
      fetchUsers();
  }, [toast]);

  const handleAction = (action: string, userName: string) => {
    toast({
      title: `${action} Clicked`,
      description: `You have clicked ${action} for user: ${userName}`,
    });
  };

  if(isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold">User</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
             <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" /> Export
            </Button>
        </div>
      </div>
      <Tabs defaultValue="username">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Username"
                    className="w-full pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                        <Checkbox />
                        </TableHead>
                        <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                            Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                            Username <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                            Email <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                        </TableHead>
                        <TableHead>
                            Phone Number
                        </TableHead>
                        <TableHead>
                            Date Created
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.dateCreated}</TableCell>
                        <TableCell>
                            <Badge
                            variant={user.status === 'Active' ? 'default' : 'destructive'}
                            className={cn('whitespace-nowrap', user.status === 'Active' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' : 'bg-red-500/20 text-red-700 hover:bg-red-500/30')}
                            >
                            <span className={`mr-1 h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAction('View', user.name)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction('Edit', user.name)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Delete', user.name)}>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 10 of {users.length} entries
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button variant="outline" size="sm">
                  First
                </Button>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="default" size="sm">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                </div>
                <Button variant="outline" size="sm">
                  Next
                </Button>
                <Button variant="outline" size="sm">
                  Last
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="activity-log">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent activities performed by users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activity log coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
