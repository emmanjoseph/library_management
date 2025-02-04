import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Trash2Icon } from 'lucide-react'
import {
    DropdownMenu,
    // DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const students = [
  {
    id: "STU001",
    name: "Alice Johnson",
    dateJoined: "2023-01-10",
    role: "Admin",
    booksBorrowed: 3,
    universityIdNo: "U123456",
    universityIdCard: "https://via.placeholder.com/50", // Replace with actual image URL
  },
  {
    id: "STU002",
    name: "Bob Smith",
    dateJoined: "2022-09-15",
    role: "User",
    booksBorrowed: 2,
    universityIdNo: "U123457",
    universityIdCard: "https://via.placeholder.com/50",
  },
  {
    id: "STU003",
    name: "Charlie Brown",
    dateJoined: "2021-11-20",
    role: "Admin",
    booksBorrowed: 5,
    universityIdNo: "U123458",
    universityIdCard: "https://via.placeholder.com/50",
  },
  {
    id: "STU004",
    name: "Diana Prince",
    dateJoined: "2023-03-05",
    role: "User",
    booksBorrowed: 1,
    universityIdNo: "U123459",
    universityIdCard: "https://via.placeholder.com/50",
  },
  {
    id: "STU005",
    name: "Edward Nygma",
    dateJoined: "2022-07-12",
    role: "User",
    booksBorrowed: 4,
    universityIdNo: "U123460",
    universityIdCard: "https://via.placeholder.com/50",
  },
]

const Users = () => {
  return (
    <section className='bg-white p-5 rounded-2xl'>
        <div className='my-3'>
            <h1>All Users</h1>
        </div>
      <Table>
        <TableCaption>A list of your students.</TableCaption>
        <TableHeader className='bg-light-300 my-2'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="">Books Borrowed</TableHead>
            <TableHead>University ID No</TableHead>
            <TableHead>University ID Card</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.dateJoined}</TableCell>
              <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button className={cn(`${student.role === "User" ? "bg-green-500/30 text-green-500": "bg-red-800/30 text-red-800" } py-2 px-3 font-medium rounded-full hover:bg-none hover:shadow-sm`)}>
                        <p className='text-[14px]'>{student.role}</p>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Admin
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="">{student.booksBorrowed}</TableCell>
              <TableCell>{student.universityIdNo}</TableCell>
              <TableCell>
                {/* <Image
                  src={student.universityIdCard}
                  alt={`${student.name} University ID`}
                  className="w-10 h-10 object-cover rounded-full"
                /> */}
                <button className='flex items-center gap-2 text-sm capitalize font-medium text-blue-500'>View id card<Eye size={14}/></button>
              </TableCell>
              <TableCell>
                <button className="text-red-500"><Trash2Icon/></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default Users
