import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Trash2Icon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import { getUsersWithBorrowedBooks } from '@/lib/actions/books'




const Users = async () => {
  const allUsers = await getUsersWithBorrowedBooks()
  return (
    <section className='bg-white p-5 rounded-2xl'>
        <div className='my-3'>
            <h1>All Users</h1>
        </div>
      <Table>
        <TableHeader className='bg-light-300'>
          <TableRow className=''>
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
          {allUsers.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="font-medium">
                <div className='flex items-center gap-2'>
                  <div className='size-12 bg-blue-200 rounded-full flex items-center justify-center'>
                    <h2 className='font-bold text-white'>IN</h2>
                  </div>
                  <div>
                    <h4 className='text-dark-300 font-medium'>{user.name}</h4>
                    <p className='text-light-500 text-xs font-medium'>{user.email}</p>
                  </div>

                </div>
              </TableCell>
              <TableCell>
                <p className='font-medium text-[14px] text-dark-300'>{user.dateJoined?.toDateString()}</p>
              </TableCell>
              <TableCell> 
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className={cn(`${user.role === "USER" ? "bg-green-500/30 text-green-500": "bg-red-800/30 text-red-800" } py-2 px-3 font-medium rounded-full hover:bg-transparent hover:shadow-sm`)}>
                        <p className='text-[12px]'>{user.role}</p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='rounded-xl p-2'>
                        <DropdownMenuItem>
                            User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Admin
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              <TableCell className='font-medium text-[14px] text-dark-300'>
                {user.booksBorrowed}
              </TableCell>

              <TableCell className='font-medium text-[14px] text-dark-300'>
                {user.universityId}
                </TableCell>
              <TableCell>
                {/* <Image
                  src={user.universityIdCard}
                  alt={`${user.name} University ID`}
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
