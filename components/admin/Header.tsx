import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';


const Header = ({session}:{session:Session}) => {
    
  return (
    <header className='admin-header'>
        <div className='p-3 shadow rounded-xl'>
          <h2 className='text-dark-400 font-semibold text-xl'>{session?.user?.name}</h2>
          <p className="text-[14px] text-slate-500">
            Monitor all of your users and books here
          </p>
        </div>

        <p>search</p>
    </header>
  )
}

export default Header