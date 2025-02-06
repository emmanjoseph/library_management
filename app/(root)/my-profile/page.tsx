import { auth } from '@/auth';
import BookList from '@/components/BookList';
import LogoutButton from '@/components/LogoutButton';
import { getStudentDetails } from '@/lib/actions/auth';
import { userGetBorrowedBooks } from '@/lib/actions/books';
import Image from 'next/image';

const Page = async () => {
  const session = await auth();
  const studentEmail = session?.user?.email || "";
  const studentDetails = await getStudentDetails(studentEmail);
  const studentId = studentDetails.data?.id || ""; // Assuming this maps to `userId`

  // Fetch the books the user has borrowed
  const borrowedBooksResponse = await userGetBorrowedBooks(studentId)
  const borrowedBooks = borrowedBooksResponse.success ? borrowedBooksResponse.data : [];

  // console.log(borrowedBooks);
  

  return (
    <>
      <h1 className='text-white text-2xl py-2 font-semibold'>My Profile</h1>
      <section className='grid lg:grid-cols-2 gap-14'>
        <div className='bg-gradient-to-b from-slate-800 shadow-2xl shadow-black px-5 py-10 rounded-2xl h-[400px]'>
          <div className='flex gap-4 items-center'>
            <Image src={session?.user?.image || "https://placehold.co/400x600.png" } alt="profile" width={100} height={100} className='size-20 rounded-full'/>
            <div className='space-y-2'>
              <h2 className='text-light-100 font-semibold text-2xl'>{session?.user?.name}</h2>
              <span className='text-light-300 text-sm'>{session?.user?.email}</span>
            </div>
          </div>

          <div className='mt-7 space-y-2'>
            <h1 className='text-normal font-bold text-light-100'>University</h1>
            <p className='text-light-300 font-medium'>{studentDetails.data?.university}</p>
            <h1 className='text-normal font-bold text-light-100'>Student ID</h1>
            <p className='text-light-300 font-medium'>{studentDetails.data?.universityId}</p>
          </div>

          <div className="mt-5">
            <LogoutButton/>
          </div>
        </div>


         {borrowedBooks ? (
        <BookList title="Borrowed Books" books={borrowedBooks} />
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
