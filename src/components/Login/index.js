import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


export default function Login() {
    const { data: session } = useSession()

    console.log({session})

    if (session) {
      return (
        <>
          <h3>
            Welcome {session.user.name}!
            <img src={session.user.image} alt="user image" style={{width: '100px', borderRadius: '50%'}} />
          </h3>
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in with Google</button>
      </>
    )
  }