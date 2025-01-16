"use client"
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validation'
import React from 'react'

const Page = () => {
  return (
     <AuthForm
    type="SIGN_UP"
    schema = {signUpSchema}
    defaultValues={{
      email:"",
      password:"",
      fullName:"",
      university:"",
      universityCard:"",
      universityId:0
    }}
    onSubmit = {signUp}
    />
  )
}

export default Page