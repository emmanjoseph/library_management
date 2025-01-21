import BookForm from '@/components/admin/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
    <Button asChild className='back-btn'>
        <Link href="/admin/books">
        Go back
        </Link>
    </Button>

    <section className='w-full max-w-2xl'>
       <BookForm/>
    </section>
    </>
  )
}

export default Page