import { auth } from '@/auth';
import BookOverview from '@/components/BookOverview';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async ({params}:{ params:Promise<{id: string}>}) => {
    const id =(await (params)).id;
    const session = await auth();
    // fetch book data based on id 
    const [bookDetails] =await db.select().from(books).where(eq(books.id , id)).limit(1)

    if(!bookDetails) redirect("/404")
        // console.log(bookDetails);
        
  return (
    <div>
        Book details
        <BookOverview {...bookDetails} userId={session?.user?.id as string}/>

        <div className="grid lg:grid-cols-2 mt-16 gap-7">
            <div>
            {/* <div className="flex-[1.5]">
                <div className="flex flex-col gap-7">
                <h3 className='text-white'>Video</h3>
                VIDEO COMPONENT
                </div>
               
            </div> */}
            <article className="mt-10 flex flex-col gap-7">
                <h3 className='text-white font-bold text-[20px]'>Book Summary</h3>
            <p className="text-[15px] space-y-5 text-light-100">
                {bookDetails.summary}
            </p>
            <Button className='form-btn my-10 rounded-2xl' asChild>
                <div>
                <ChevronLeft size={20}/>
                <Link href='/'> back to homepage</Link>
                </div>
          
        </Button>
            </article>
            </div>
           
            {/* summary */}
            <div className=''>
               <h1 className="text-[20px] font-bold text-light-100">Related Topics</h1>
            </div>
        </div>

        
        </div>
  )
}

export default Page