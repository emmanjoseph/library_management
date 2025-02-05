import { Button } from '@/components/ui/button'
import { ListOrderedIcon } from 'lucide-react'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import BookCover from '@/components/BookCover';
import { getBorrowedRecords } from '@/lib/actions/books';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const BorrowRequests = async () => {
      const requests = await getBorrowedRecords()
      const allRequests = Array.isArray(requests?.data) ? requests.data : [];
  return (
    <section
    className='w-full rounded-2xl bg-white p-7 shadow-md'
    >
        <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Borrow Book Requests</h2>
            <Button variant='ghost' className='flex items-center gap-2'><p>Oldest to recent</p><ListOrderedIcon/></Button>
        </div>
        <div className="mt-7">
            <Table>
                <TableHeader className='bg-light-300'>
                  <TableRow className=''>
                        <TableHead>Book</TableHead>
                        <TableHead>User requested</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Borrow date</TableHead>
                        <TableHead>Due date</TableHead>
                  </TableRow>
             </TableHeader>
             <TableBody>
                {allRequests.map((book)=>(
                    <TableRow key={book.bookId}>
                        <TableCell className='flex items-center gap-2'>
                              <BookCover
                              variant='extraSmall'
                              coverImage={book.coverUrl}
                              coverColor={book.coverColor}
                              />
                              <p className='text-sm font-medium text-dark-300'>{book.title}</p>

                            </TableCell>

                             <TableCell className="font-medium">
                                            <div className='flex items-center gap-2'>
                                              <div className='size-12 bg-blue-200 rounded-full flex items-center justify-center'>
                                                <h2 className='font-bold text-white'>IN</h2>
                                              </div>
                                              <div>
                                                <h4 className='text-dark-300 font-medium'>{book.user}</h4>
                                                <p className='text-light-500 text-xs font-medium'>{book.email}</p>
                                              </div>
                            
                                            </div>
                         </TableCell>
                         <TableCell>
                         <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className={cn(`${book.status === "BORROWED" ? 'bg-indigo-400/15 text-indigo-700' : 'bg-blue-300 text-indigo-700' } py-2 px-3 font-medium rounded-full hover:bg-transparent hover:shadow-sm`)}>
                        <p className='text-[12px]'>{book.status}</p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='rounded-xl p-2'>
                        <DropdownMenuItem>
                            Borrowed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Returned
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                         </TableCell>
                         <TableCell>
                            <p className='text-sm font-medium text-dark-300'>{book.borrowDate.toDateString()}</p>
                        </TableCell>
                         <TableCell>
                            <p className='text-sm font-medium text-dark-300'>{book.dueDate.toString()}</p>
                        </TableCell>


                    </TableRow>
                ))}
             </TableBody>
            </Table>
        </div>
    </section>
  )
}

export default BorrowRequests