import React from 'react'
import SearchBar from '@/components/Search'
import Login from '@/components/Login'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { StyledDiv, StyledImage } from './TopNavBar.styles'


export default function TopNavBar({setQuery, query}) {
    const { data: session } = useSession();

  return (
    <StyledDiv>
        <SearchBar setQuery={setQuery} query={query} />
        {session ?
        <Link href="/profile-page"><StyledImage src={session.user.image} alt="user image" /></Link>
        : <Link href="/sign-up" ><StyledImage src="/signup-user.png" alt="sign up" /></Link> }
    </StyledDiv>
  )
}
