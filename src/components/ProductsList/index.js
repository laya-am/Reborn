import React from 'react'
import ProductCard from '../ProductCard'
import useSWR from "swr"
import { useRouter } from 'next/router'
import { StyledDiv, StyledButton } from './ProductsList.styled'


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
        <ProductCard title= {product.name} price= {product.price} imageSrc= {product.image} location={product.location}/>
      </StyledButton>
    ))}
    </StyledDiv>
  )
}
