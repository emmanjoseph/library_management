import React from 'react'
import BookCard from './BookCard'

interface Props{
    title:string,
    books:Book[],
    containerClassName?:string
}
const BookList = ({title,books,containerClassName}:Props) => {
  return (
    <section className={containerClassName}>
     <h2 className='font-bebas-neue text-4xl text-light-400'>Popular Books</h2>

     <ul className='book-list'>
        {books.map((book)=>(
            <BookCard {...book} key={book.title}/>
        ))}
     </ul>
    </section>
  )
}

export default BookList
