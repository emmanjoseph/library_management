import { Session } from 'next-auth';
import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';



const Header = ({session}:{session:Session}) => {
    
  return (
    <header className='admin-header'>
        <div className=''>
          <h2 className='text-dark-400 font-semibold text-xl'>{session?.user?.name}</h2>
          <p className="text-[14px] text-slate-500">
            Monitor all of your users and books here
          </p>
        </div>

       <div className='flex items-center gap-2 border rounded-xl px-4 py-1 lg:w-[450px]'>
       <Search width={20}/>
        <Input
        className='bg-transparent text-dark-100 outline-none border-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0'
        placeholder='Search users, books by title, author, or genre.'
        />
       </div>
    </header>
  )
}

export default Header