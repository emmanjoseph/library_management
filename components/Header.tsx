'use client'

import { cn, getInitials } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'  // Import useSession hook

const Header = () => {
  const { data: session} = useSession();  // Fetch session data
  console.log(session);
  
  const pathname = usePathname();

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/'>
        <Image src='/icons/logo.svg' alt='' width={40} height={40}/>
      </Link>

      <ul className="flex flex-row items-center gap-3">
        <li>
          <Link href='/library' className={cn(
            'text-base cursor-pointer capitalize',
            pathname === '/library' ? 'text-light-200' : 'text-light-100'
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
              {/* <AvatarImage src={session?.user?.image || ''} alt='User Avatar' /> */}
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
