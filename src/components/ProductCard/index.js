import React from 'react'
import { StyledCard, StyledImage, StyledInfo, StyledLine } from './ProductCard.styled'

export default function ProductCard({title, price, imageSrc, location}) {
  return (
    <StyledCard>
    <StyledImage src={imageSrc}></StyledImage>
    <StyledLine></StyledLine>
    <StyledInfo>
      <h3>{title}</h3>
      <h4>{price} €</h4> 
      <p>{location}</p>
    </StyledInfo>
    </StyledCard>
  )
}
