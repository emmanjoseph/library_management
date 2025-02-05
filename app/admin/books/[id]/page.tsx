'use client'
import BookCover from '@/components/BookCover'
import { Button } from '@/components/ui/button'
import { getBookById } from '@/lib/actions/books'
import { ArrowLeft, Calendar, PenLine, VideoOffIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const {id} = useParams()
  console.log(id);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(()=>{
    const getBookDetails = async () => {
     const result =  await getBookById(id as string);
     setBook(result)
    //  console.log(result);
    }
    getBookDetails();
  },[id])
  
  console.log(book);
  
  return (
    <section>
      <Button variant='ghost' className='mb-6'>
        <ArrowLeft/>
        <p>Go back</p>
      </Button>
      <div className='max-w-xl flex flex-col lg:flex-row gap-3'>
        <div className='p-4 rounded-xl flex items-center justify-center lg:w-1/2'
       style={{
        backgroundColor: book?.coverColor ? `${book.coverColor}80` : "rgba(0, 0, 0, 0.5)",
      }}
      
        >
          <BookCover
          coverColor={book?.coverColor as string}
          coverImage={book?.coverUrl as string}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='text-light-500 font-medium flex gap-1'>Created At : <span className='flex items-center gap-1'><Calendar size={15}/>{book?.createdAt?.toDateString()}</span></h3>

          <h1 className='text-3xl font-semibold text-dark-300'>{book?.title}</h1>
          <p className='text-dark-300 font-medium'>By {book?.author}</p>
          <p className='font-medium text-dark-700 italic'>Genre : {book?.genre}</p>

          <Button className='bg-primary-admin w-full'>
            <PenLine/><p>Edit</p>
          </Button>
        </div>

      </div>

      <article className='mt-7 flex gap-10 flex-col lg:flex-row'>
        <div className='lg:w-3/5'>
        <h1 className='font-semibold text-dark-200 py-5'>Summary</h1>
        <p className='text-[15px] text-light-500'>{book?.summary}</p>
        </div>

        <div className='lg:w-2/5'>
        <h1 className='font-semibold text-dark-200 py-5'>Video</h1>

        <div className='bg-violet-400/25 animate-pulse w-full h-[300px] rounded-xl flex items-center justify-center flex-col'>
          <VideoOffIcon className='text-red-800 animate-bounce' size={40}/>
          <p className='text-light-500'>Video playback not available</p>
        </div>
        </div>
        

      </article>
    </section>
  )
}

export default Page