import Login from '@/components/Login'
import UserForm from '@/components/UserForm'
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

export default function SignUp() {
  const router = useRouter();
  const { push } = router;
  const { data: session } = useSession()

  if(!session){
  return (
    <>
    <h2>Sign Up And Become One Of Us!</h2>
    <UserForm buttonText="Sign Up" />
    <Login />
    </>
  )
  }
  push("/")
}
