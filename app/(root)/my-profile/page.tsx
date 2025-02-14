import { auth } from '@/auth';
import BookCover from '@/components/BookCover';
import LogoutButton from '@/components/LogoutButton';
import { getStudentDetails } from '@/lib/actions/auth';
import { userGetBorrowedBooks } from '@/lib/actions/books';
import { BookOpen, CalendarCheck } from 'lucide-react';
import Image from 'next/image';


const Page = async () => {
  const session = await auth();
  const studentEmail = session?.user?.email || "";
  const studentDetails = await getStudentDetails(studentEmail);
  const studentId = studentDetails.data?.id || ""; // Assuming this maps to `userId`

  // Fetch the books the user has borrowed
  const borrowedBooksResponse = await userGetBorrowedBooks(studentId)
  const borrowedBooks:BorrowedBook[] = borrowedBooksResponse.success ? borrowedBooksResponse.data : [];
  // console.log(borrowedBooks);
  


  return (
    <>
      <h1 className='text-white text-2xl py-2 font-semibold'>My Profile</h1>
      <section className='max-w-7xl grid lg:grid-cols-2 gap-10'>

        <div>


        <div className='bg-gradient-to-b from-slate-800 shadow-2xl shadow-black px-5 py-10 rounded-2xl h-[400px]'>
          <div className='flex gap-4 items-center'>
            <Image src={session?.user?.image || "https://placehold.co/400x600.png" } alt="profile" width={80} height={80} className='size-14 rounded-full'/>
            <div className='space-y-2'>
              <h2 className='text-light-100 font-semibold text-2xl'>{session?.user?.name}</h2>
              <span className='text-light-300 text-sm'>{session?.user?.email}</span>
            </div>
          </div>

          <div className='mt-7 space-y-2'>
            <h1 className='text-[15px] text-light-100'>University</h1>
            <p className='text-light-300 font-medium'>{studentDetails.data?.university}</p>
            <h1 className='text-[15px]  text-light-100'>Student Id</h1>
            <p className='text-light-300 font-medium'>{studentDetails.data?.universityId}</p>
          </div>

          <div className="mt-5">
            <LogoutButton/>
          </div>
        </div>

        <div className='mt-5 text-light-300'>
          <p>Want to be a part of the library community and share more </p>
        </div>
        </div>

         {borrowedBooks ? (
        // <BookList title="Borrowed Books" books={borrowedBooks} />
        <div className='flex flex-col gap-y-4'>
        <h1 className='text-light-100 text-2xl font-semibold'>Borrowed Books</h1>

        <div className='grid lg:grid-cols-2 gap-4'>
        {borrowedBooks.map((book)=>{
          const isOverdue = book.daysDue < 0;
          return (
            <div key={book.id} className='bg-slate-900 p-3 rounded-xl'>
  
              <div className='flex items-center justify-center p-5 rounded-xl'
               style={{
                backgroundColor: book?.coverColor ? `${book.coverColor}80` : "rgba(0, 0, 0, 0.5)",
              }}
              >
              <BookCover
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
              variant='medium'
               />
              </div>
              
              <p className='text-white font-bold text-base mt-4'>{book.title}</p>
              <span className='text-light-300 font-medium italic text-sm'>{book.genre}</span>
              <div className='mt-2'>
              <p className='text-light-100 text-sm font-medium flex items-center gap-2'><BookOpen size={14} className='text-blue-300'/><span>Borrowed on {book.borrowDate?.toString() || "Month/00"}</span></p>
              <div className='text-sm font-medium text-light-300'>
                {isOverdue
                  ? `Overdue by ${Math.abs(book.daysDue)} days`
                  : (
                    <p className='flex items-center gap-1'><CalendarCheck size={12} className='text-primary'/>{book.daysDue} days to due</p>
                  )
                  
                  }
              </div>
              </div>
            </div>
          )
        })}
        </div>
        </div>
         ) : (
          <div className='lg:max-w-[400px] flex items-center justify-center flex-col'>
            <Image src='/no-data.gif' alt='no data ' width={1000} height={1000} className='object-cover'/>
            <div>
              <h3 className='text-light-300 font-medium text-center'>No books borrowed yet</h3>
              <p className='text-primary text-sm text-center'>Borrow your first book</p>
            </div>
          </div>
         )}
        {/* Fetch and display borrowed books */}
      </section>
    </>
  );
};

export default Page;
