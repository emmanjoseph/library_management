import BookList from '@/components/BookList'
import { Input } from '@/components/ui/input'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import { desc } from 'drizzle-orm'
import { Search } from 'lucide-react'
import React from 'react'

const Page = async () => {
  const allBooks = (await db.select().from(books).limit(12).orderBy(desc(books.createdAt)))as Book[];
  return (
    <section className='max-w-7xl mx-auto'>
        <div className='py-5'>
            <h3 className='font-ibm-plex-sans text-light-300/60 font-semibold text-[15px] uppercase leading-5 text-center tracking-wide'>Discover your next great read</h3>
            <h1 className='text-5xl text-light-300 font-bold tracking-wide text-center'>Explore and Search for <br /> <span className='text-primary'>Any Book</span> in Our Library</h1>
        </div>
        <form>
          <div className="flex space-x-4 items-center bg-slate-700 py-2 px-3 rounded-xl shadow-xl shadow-black max-w-[600px] mx-auto">
            <Search className='text-primary font-bold'/>
            <Input placeholder='Search for books'  className='bg-transparent text-light-300 outline-none border-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0'/>
          </div>
          <div>
            <BookList title='All Books' books={allBooks} containerClassName='mt-10' />
          </div>
        </form>
    </section>
  )
}

export default Page