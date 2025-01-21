'use client';

import BookList from '@/components/BookList';
import { sampleBooks } from '@/constants';
import { signOut } from '@/lib/actions/auth';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut(); // Call the server action
    setIsLoading(false);
  };

  return (
    <>
      <h1>Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignOut();
        }}
        className="mb-10"
      >
        <button
          type="submit"
          className="max-w-48 form-btn flex items-center"
        >
          <p>Logout</p>
          {isLoading && <Loader className="ml-2 animate-spin" size={17} />}
        </button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default Page;
