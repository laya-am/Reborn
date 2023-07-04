import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const StyledNav= styled.ul`
background-color: #862B0D;
display: flex;
justify-content: space-evenly;
padding: 15px;
bottom: 0;
position: fixed;
width: 100vw;
`
const StyledLi= styled.li`
list-style-type: none;
`

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <StyledNav>
        <StyledLi><Link href="/">Home</Link></StyledLi>
        <StyledLi><Link href="/create-new-product">Sell Your Product</Link></StyledLi>
        { session && <StyledLi><Link href="/profile-page">Profile</Link></StyledLi>}
        { session && <StyledLi><Link href="/messages">Messages</Link></StyledLi>}
    </StyledNav>
  )
}
