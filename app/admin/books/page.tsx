import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link'
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
import { LucideTrash2, PenLine } from 'lucide-react';

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
                              <Button variant="ghost" size="icon"><PenLine className='text-blue-500'/></Button>
                              <Button variant="ghost" size="icon" className='text-red-600'><LucideTrash2/></Button>
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