'use client'
import { signOut } from '@/lib/actions/auth';
import { Loader, LogOutIcon } from 'lucide-react';
import React, { useState } from 'react'

const LogoutButton = () => {
  

    const [isLoading, setIsLoading] = useState(false);
  
      const handleSignOut = async () => {
        setIsLoading(true);
        await signOut(); // Call the server action
        setIsLoading(false);
      };
      
  return (
    <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSignOut();
    }}
    className="mb-10"
  >
    <button
      type="submit"
      className="max-w-48 text-white bg-red-600 px-6 py-3 rounded-3xl flex items-center font-medium"
    >
      {isLoading ? (
        <>
            <span>Signing out...</span>
            <Loader size={20} className="mr-2 animate-spin" />
        </>
      ): (
        <>
        <span>Sign out</span>
        <LogOutIcon size={17} className='ml-3'/>
        </>
      )}
    </button>
  </form>
  )
}

export default LogoutButton