import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import BookCover from '@/components/BookCover';
import { LucideTrash2, PenLine } from 'lucide-react';
import { DeleteBookButton } from '@/components/buttons';

const Page = async () => {
   // get recently added books 
    const allBooks = (await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt)) // Order by createdAt in descending order
      .limit(10) // Then limit to 10
    ) as Book[];

  return (
    <section
    className='w-full rounded-2xl bg-white p-7 shadow-md'
    >
        <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">All Books</h2>
            <Button className='bg-primary-admin' asChild>
            <Link href='/admin/books/new' className='text-white'>
            Create a new book +
            </Link>
            </Button>
        </div>

        <div className='mt-7'>
            <Table>
               <TableHeader className='bg-light-300'>
                        <TableRow className=''>
                          <TableHead>Book title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Genre</TableHead>
                          <TableHead className="">Date created</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allBooks.map((book)=>(
                          <TableRow key={book.id}>
                            <TableCell >
                              <Link href={`/admin/books/${book.id}`} className='flex items-center gap-2'>
                              <BookCover
                              variant='extraSmall'
                              coverImage={book.coverUrl}
                              coverColor={book.coverColor}
                              />
                              <p className='text-sm font-medium text-dark-300'>{book.title}</p>
                              </Link>
                             

                            </TableCell>

                            <TableCell>
                              <p className='text-sm font-medium text-dark-300'>{book.author}</p>
                            </TableCell>
                            <TableCell>
                              <p className='text-sm font-medium text-dark-300'>{book.genre}</p>
                            </TableCell>
                            <TableCell>
                              <p className='text-sm font-medium text-dark-300'>{book.createdAt?.toDateString()}</p>
                            </TableCell>
                            <TableCell className='flex items-center space-x-2'>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/books/edit/${book.id}`}>
                                <PenLine className='text-blue-500'/>
                                </Link>
                                </Button>

                              <AlertDialog>
                                 <AlertDialogTrigger>
                              <Button variant="ghost" size="icon" className='text-red-600'><LucideTrash2/></Button>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent className='rounded-xl'>
                                   <AlertDialogHeader className='flex flex-col items-center'>
                                   <LucideTrash2 size={40} className='text-red-800'/>
                                     <AlertDialogTitle className='text-center text-dark-100'>Are you absolutely sure?</AlertDialogTitle>
                                     <AlertDialogDescription className='text-center'>
                                       This action cannot be irreversible. This will permanently delete the selected book from the storage
                                     </AlertDialogDescription>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter>
                                     <AlertDialogCancel className='rounded-xl text-light-500'>Cancel</AlertDialogCancel>
                                     <AlertDialogAction className='bg-red-800 text-light-400 rounded-xl'><DeleteBookButton bookId={book.id}/></AlertDialogAction>
                                   </AlertDialogFooter>
                                 </AlertDialogContent>
                           </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
            </Table>
        </div>
    </section>
  )
}

export default Page