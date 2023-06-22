import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledNav= styled.ul`
background-color: skyblue;
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
  return (
    <StyledNav>
        <StyledLi><Link href="/">Home</Link></StyledLi>
        <StyledLi><Link href="/sign-up">Sign Up</Link></StyledLi>
        <StyledLi><Link href="/create-new-product">Sell Your Product</Link></StyledLi>
        {/* <StyledLi><Link href="/profile-page">Profile</Link></StyledLi> */}
        <StyledLi><Link href="/messages">Messages</Link></StyledLi>
    </StyledNav>
  )
}
