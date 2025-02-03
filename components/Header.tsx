'use client'

import { cn, getInitials } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'  // Import useSession hook

const Header = () => {
  const { data: session} = useSession();  // Fetch session data
  // console.log(session);
  
  const pathname = usePathname();

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/icons/logo.svg' alt='' width={40} height={40}/>
        <span className='font-bold text-light-300 text-3xl sm:hidden lg:block'>Bookwise</span>
      </Link>

      <ul className="flex flex-row items-center gap-4">
        <li>
          <Link href='/library' className={cn(
            'text-base cursor-pointer capitalize',
            pathname === '/library' ? 'text-light-200 font-medium' : 'text-light-100'
          )}>
            Library
          </Link>
        </li>

        <li>
          <Link href='/my-profile'>
            <Avatar className='flex items-center justify-center'>
              <AvatarFallback className='text-black font-semibold font-ibm-plex-sans bg-amber-100'>
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
