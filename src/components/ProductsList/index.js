import React from 'react'
import ProductCard from '../ProductCard'
import styled from 'styled-components'
import useSWR from "swr"
import { StyledButton } from '../Button/Button.styled'
import { useRouter } from 'next/router'

const StyledDiv= styled.div`
    display: flex;
    ${'' /* flex-direction: column; */}
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px;
    gap: 50px;
    height: 100vh
`

export default function ProductsList() {

  const router= useRouter();
  const { data: products, error, isLoading } = useSWR('/api/products')
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <StyledDiv>
    {products.map(product => (
      <StyledButton key={product._id} onClick={() => router.push(`/${product._id}`)}>
        <ProductCard title= {product.name} price= {product.price} description= {product.description} imageSrc= {product.image} date={product.date}/>
      </StyledButton>
    ))}
    </StyledDiv>
  )
}
