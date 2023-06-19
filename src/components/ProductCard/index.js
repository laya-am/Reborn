import React from 'react'
import { StyledCard, StyledImage } from './ProductCard.styled'

export default function ProductCard({title, price, description, imageSrc}) {
  return (
    <StyledCard>
    <StyledImage src={imageSrc}></StyledImage>
    <h2>{title}</h2>
    <h3>{price}</h3>
    <p>{description}</p>
    </StyledCard>
  )
}
