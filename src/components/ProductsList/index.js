import React from 'react'
import ProductCard from '../ProductCard'
import styled from 'styled-components'
import useSWR from "swr"

const StyledDiv= styled.div`
    display: flex;
    ${'' /* flex-direction: column; */}
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px;
    gap: 50px;
    height: 100vh
`
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ProductsList() {
  const { data: products, error, isLoading } = useSWR('/api/productsList', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <StyledDiv>
    {products.map(product => (
      <ProductCard key={product._id} title= {product.name} price= {product.price} description= {product.description} imageSrc= {product.image}/>
      ))
    }
    </StyledDiv>
  )
}
