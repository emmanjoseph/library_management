import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { sampleBooks } from '@/constants'
import React from 'react'


const Page = () => {
  return (
    <>
    Profile
    <form action={ async()=>{
        "use server"

        await signOut()
    }} className='mb-10'>
        <button className='max-w-48 form-btn'>logout</button>
    </form>
    <BookList
    title='Borrowed Books'
    books={sampleBooks}
    />
    </>
  )
}

export default Page