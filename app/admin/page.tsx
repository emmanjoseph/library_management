import AccountRequest from '@/components/admin/AccountRequest'
import BorrowRequests from '@/components/admin/BorrowRequests'
import BookCover from '@/components/BookCover'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import { Calendar, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <section className='flex flex-col space-y-3'>
      {/* stats */}
      <div className='grid lg:grid-cols-3 gap-3'>
        <div className='bg-white shadow-sm p-5 rounded-xl flex flex-col gap-y-3'>
          <h3 className='text-base font-semibold text-gray-600/70'>Borrowed books</h3>
          {/* stats */}
          <div>
            <h1 className='text-3xl font-bold text-black/80'>145</h1>
          </div>
        </div>
        <div className='bg-white shadow-sm p-5 rounded-xl flex flex-col gap-y-3'>
          <h3 className='text-base font-semibold text-gray-600/70'>Total Users</h3>
          {/* stats */}
          <div>
            <h1 className='text-3xl font-bold text-black/80'>317</h1>
          </div>
        </div>
        <div className='bg-white shadow-sm p-5 rounded-xl flex flex-col gap-y-3'>
          <h3 className='text-base font-semibold text-gray-600/70'>Total Books</h3>
          {/* stats */}
          <div>
            <h1 className='text-3xl font-bold text-black/80'>173</h1>
          </div>
        </div>
      </div>

      {/* rest of the body */}
      <section className='flex flex-col lg:flex-row gap-3 '>
        <div className='w-full lg:w-1/2 grid grid-rows-2 gap-3'>
          <BorrowRequests/>
          <AccountRequest/>
        </div>
        <div className='w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-5 space-y-5'>
        {/* top */}
        <div className='w-full flex lg:items-center justify-between'>
        <h1 className='text-lg font-semibold text-dark-300/80'>Recently Added Books</h1>
        <Button className='rounded-xl text-[14px] text-primary-admin bg-light-300 hover:bg-transparent'>
          View All
        </Button>       
        </div>

         {/* body */}
        <Link href="/admin/books/new">
        <button className='w-full bg-light-300 p-4 rounded-2xl mt-3 flex items-center gap-2 '>
          <div className="p-2 bg-white rounded-full">
          <Plus className='text-black '/>
          </div>
          <p className='font-medium text-base capitalize'>add a new book</p>
        </button>
        </Link>

        <div className='flex flex-col space-y-5'>
          {sampleBooks.slice(0,5).map((book)=>{
            return (
              <div key={book.id} className='flex items-center gap-3'>
                <div>
                  <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  variant='small'
                  />
                </div>

                <div>
                <div className=''>
                  <h1 className='text-[15px] text-dark-100 font-semibold'>{book.title}</h1>
                  {/* author and title */}
                  <div className='flex lg:items-center gap-2 text-sm font-medium text-light-500 flex-col lg:flex-row'>
                    <span>By {book.author}</span>
                    <span>{book.genre}</span>
                  </div>
                </div>
                <p className='text-xs font-medium text-light-500 flex items-center gap-2 mt-1'><Calendar size={12}/><span>12/11/24</span></p>
                </div>
              </div>
            )
          })}
        </div>
          
        </div>
      </section>
    </section>
  )
}

export default Page