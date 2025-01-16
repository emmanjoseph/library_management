import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'
import BookCoverSvg from './BookCoverSvg'


type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles:Record<BookCoverVariant , string> = {
    extraSmall:"book-cover_extra_small",
    small:"book-cover_small",
    medium:"book-cover_medium",
    regular:"book-cover_regular",
    wide:"book-cover_wide",
}

interface Props {
    className?:string,
    variant ?:BookCoverVariant
    coverColor :string,
    coverImage :string
}
const BookCover = ({className,
    variant = "regular",
    coverImage = "https://placehold.co/400x600.png" ,
    coverColor = "#012B48"
}:Props) => {
  return (
    <div className={cn('relative transition-all duration-300',
        variantStyles[variant],
        className,
    )}>
        <BookCoverSvg coverColor={coverColor}/>
        <div className="absolute z-10" style={{left:"12%", width:"87.5%", height:"88%"}}>
            <Image src={coverImage} alt='book cover' fill className='rounded-xl object-fill'/>
        </div>
    </div>
  )
}

export default BookCover
