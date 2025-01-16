"use client"
import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validation'
import { signInWithCredentials } from '@/lib/actions/auth'

const Page = () => {
  return (
    <AuthForm
    type="SIGN_IN"
    schema = {signInSchema}
    defaultValues={{
      email:"",
      password:""
    }}
    onSubmit = {signInWithCredentials}
    />
  )
}

export default Page
