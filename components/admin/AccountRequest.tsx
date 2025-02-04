import React from 'react'
import { Button } from '../ui/button'


const requests = [
    {
        name:"Mark atenson",
        email:"marcine@gmail.com"
    },
    {
        name:"Susan Test",
        email:"hotSussanaflex@gmail.com"
    },
    {
        name:"Collins Gordon",
        email:"ramsey55@gmail.com"
    },
    {
        name:"james Allister",
        email:"realjames101@gmail.com"
    },
    {
        name:"Jason Wealth",
        email:"chrisdoyle@gmail.com"
    },

]
const AccountRequest = () => {
  return (
    <div className='bg-white p-5 rounded-xl'>
        <div className='flex items-center justify-between'>
        <h1 className='text-base font-semibold text-dark-100/80'>Borrow Requests</h1>
         <Button className='rounded-xl text-[14px] text-primary-admin bg-light-300 hover:bg-transparent'>
                  View All
          </Button> 
      </div>
      <div className='grid lg:grid-cols-3 gap-2 mt-2'>
        {requests.map((request)=>(
            <div key={request.name} className='bg-light-300 flex flex-col space-y-3 rounded-xl p-3 items-center'>
                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                    <h1>IN</h1>
                </div>
                <div className='flex flex-col items-center'>
                <h3 className='font-semibold text-dark-300 text-[15px]'>{request.name}</h3>
                <span className='text-xs text-light-500'>{request.email}</span>
                </div>
                
            </div>
        ))}
      </div>
    </div>
  )
}

export default AccountRequest