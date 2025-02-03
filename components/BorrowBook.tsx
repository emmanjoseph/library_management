'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { borrowBook } from '@/lib/actions/books'

interface Props{
    bookId:string,
    userId:string,
    borrowingEligibility:{
        isEligible:boolean,
        message:string
    }
}

const BorrowBook = ({bookId,userId,borrowingEligibility}:Props) => {

    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () =>{
        if (!borrowingEligibility.isEligible) {
            toast({
                title:"Error",
                description:borrowingEligibility.message,
                variant:"destructive"
            })
        }

        setBorrowing(true)
        try {
            const result = await borrowBook({bookId,userId});
            console.log(result);
            
            if (result) {
                toast({
                    title:"Success",
                    description:"Enjoy your book",
                    
                })
            }else{
                toast({
                    title:"Error",
                    description:"An error occurred when borrowing the book",
                    variant:"destructive"
                })
            }
            router.push('/my-profile')
        } catch (error) {
            console.log(error);
            toast({
                title:"Error",
                description:"An error occurred when borrowing the book",
                variant:"destructive"
            })
        } finally {
            setBorrowing(false)
        }
    }
  return (
    <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
        {!borrowing && <Image src="/icons/book.svg" alt="book" width={20} height={20} />}
    
    <p className="font-bebas-neue text-xl text-dark-100">{borrowing ? "Borrowing...":"Borrow book"}</p>
    {borrowing && (
      <Image
        src="/icons/loading.png"
        className="animate-spin"
        alt="loading"
        width={17}
        height={17}
      />
    )}
  </Button>
  
  )
}

export default BorrowBook