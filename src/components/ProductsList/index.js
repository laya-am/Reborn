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
    padding-top: 30px;
    gap: 30px;
    height: 100vh;
    padding-bottom: 200px;
`

export default function ProductsList({query}) {

  const router= useRouter();
  const { data: products, error, isLoading } = useSWR('/api/products')
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const foundProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <StyledDiv>
    {foundProducts.length === 0 ?
      <h1> Nothing Found:( </h1>
      : foundProducts.map(product => (
      <StyledButton key={product._id} onClick={() => router.push(`/${product._id}`)}>
        <ProductCard title= {product.name} price= {product.price} description= {product.description} imageSrc= {product.image} date={product.date} location={product.location}/>
      </StyledButton>
    ))}
    </StyledDiv>
  )
}
