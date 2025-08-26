
'use client';

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpDown,
  Search,
  ChevronDown,
  Upload,
  PlusCircle,
  MoreHorizontal,
  Eye,
  Trash,
  Pencil,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const users = [
  {
    id: 'user1',
    fullName: 'John Doe',
    username: 'johndoe12',
    email: 'johndoe12@email.com',
    phone: '0813-2222-8899',
    dateCreated: '27 Mar 2024 18:45',
    status: 'Active',
  },
  {
    id: 'user2',
    fullName: 'Abizar Alghifary',
    username: 'abizar33',
    email: 'abizar33@email.com',
    phone: '0813-4729-1056',
    dateCreated: '26 Mar 2024 14:22',
    status: 'Inactive',
  },
  {
    id: 'user3',
    fullName: 'Raffi Ahmad',
    username: 'raffiahmad',
    email: 'raffiahmad@email.com',
    phone: '0821-0394-7682',
    dateCreated: '25 Mar 2024 09:57',
    status: 'Active',
  },
  {
    id: 'user4',
    fullName: 'Putri Amaliah',
    username: 'putri211099',
    email: 'putri211099@email.com',
    phone: '0812-5583-9217',
    dateCreated: '24 Mar 2024 20:10',
    status: 'Active',
  },
  {
    id: 'user5',
    fullName: 'Zheperd Edward',
    username: 'zheperd',
    email: 'zheperd77@email.com',
    phone: '0852-7741-3320',
    dateCreated: '23 Mar 2024 16:33',
    status: 'Active',
  },
  {
    id: 'user6',
    fullName: 'Exel Sudarso',
    username: 'exellxl',
    email: 'exelbd99@email.com',
    phone: '0813-6902-4815',
    dateCreated: '22 Mar 2024 11:48',
    status: 'Active',
  },
  {
    id: 'user7',
    fullName: 'Edward Newgate',
    username: 'sirohigeprts',
    email: 'sirohigeprts@email.com',
    phone: '0821-8173-0469',
    dateCreated: '21 Mar 2024 08:15',
    status: 'Active',
  },
  {
    id: 'user8',
    fullName: 'Jack Sparrow',
    username: 'jacksparrow',
    email: 'jacksparrow@email.com',
    phone: '0812-2057-6884',
    dateCreated: '20 Mar 2024 19:27',
    status: 'Active',
  },
  {
    id: 'user9',
    fullName: 'Peter Parker',
    username: 'peterparker',
    email: 'peterparker@email.com',
    phone: '0852-9316-2508',
    dateCreated: '19 Mar 2024 17:06',
    status: 'Inactive',
  },
  {
    id: 'user10',
    fullName: 'Zuki Kato',
    username: 'zukizuki',
    email: 'zukizuki@email.com',
    phone: '0821-4680-1133',
    dateCreated: '18 Mar 2024 12:06',
    status: 'Inactive',
  },
];

export default function UsersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">User</h1>
      <Tabs defaultValue="username">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Username"
                    className="w-full pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Export
                </Button>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.dateCreated}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === 'Active' ? 'default' : 'destructive'}
                          className={user.status === 'Active' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' : 'bg-red-500/20 text-red-700 hover:bg-red-500/30'}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 10 of {users.length} entries
              </div>
              <div className="flex items-center gap-2">
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
