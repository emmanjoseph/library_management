import { auth } from '@/auth';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

   const session = await auth();
  
    if (!session) {
      redirect("/sign-up")
    }
  return (
      <main className='root-container'>
        <div className="mx-auto max-w-7xl">
            <Header/>
            <div className="mt-20 pb-20">
        {children}
            </div>
        </div>
      </main>
  );
}
