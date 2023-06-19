import React from 'react'
import { StyledCard, StyledImage } from './ProductCard.styled'

export default function ProductCard({title, price, description, imageSrc, date}) {
  return (
    <StyledCard>
    <StyledImage src={imageSrc}></StyledImage>
    <h2>{title}</h2>
    <p>posted on {date}</p>
    <h3>{price} EUR</h3>
    <p>{description}</p>
    </StyledCard>
  )
}
