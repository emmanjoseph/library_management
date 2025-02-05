import React from 'react'
import { Button } from '../ui/button'
import BookCover from '../BookCover'
import { Calendar } from 'lucide-react'
import { getBorrowedRecords } from '@/lib/actions/books'

const BorrowRequests = async () => {
  const requests = await getBorrowedRecords()
  const slicedRequests = Array.isArray(requests?.data) ? requests.data.slice(0, 3) : [];
  // console.log(slicedRequests);
  
  
  return (
    <div className='bg-white p-5 rounded-xl'>
      <div className='flex items-center justify-between'>
        <h1 className='text-base font-semibold text-dark-100/80'>Borrow Requests</h1>
         <Button className='rounded-xl text-[14px] text-primary-admin bg-light-300 hover:bg-transparent'>
                  View All
          </Button> 
      </div>

      {/*  */}
      <div className='flex flex-col space-y-2 mt-3'>
      {slicedRequests.map((book)=>{
            return (
              <div key={book.id} className='flex items-center gap-3 bg-light-300 py-2 px-2 lg:px-5 rounded-xl'>
                <div>
                  <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  variant='extraSmall'
                  />
                </div>

                <div>
                <div className=''>
                  <h1 className='text-[14px] text-dark-100 font-semibold'>{book.title}</h1>
                  {/* author and title */}
                  <div className='flex lg:items-center gap-2 text-sm font-medium text-light-500 flex-col lg:flex-row'>
                    <span>By {book.author}</span>
                    <span>{book.genre}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                <p className='text-xs font-medium'>{book.user}</p>
                <p className='text-xs font-medium text-light-500 flex items-center gap-2 mt-1'><Calendar size={12}/><span>{book.dueDate}</span></p>
                </div>
                
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default BorrowRequests