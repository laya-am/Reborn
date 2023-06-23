import Login from '@/components/Login'
import UserForm from '@/components/UserForm'
import React from 'react'

export default function SignUp() {
//   const responseMessage = (response) => {
//     console.log(response);
// };
// const errorMessage = (error) => {
//     console.log(error);
// };
  return (
    <>
    <h2>Sign Up And Become One Of Us!</h2>
    <UserForm buttonText="Sign Up" />
    <Login />
    </>
  )
}
