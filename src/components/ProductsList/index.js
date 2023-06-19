import React from 'react'
import ProductCard from '../ProductCard'
import styled from 'styled-components'

const StyledDiv= styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    height: 100vh
`

export default function ProductsList() {
  return (
    <StyledDiv>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </StyledDiv>
  )
}
