import React from 'react'
import { StyledCard, StyledImage, StyledInfo } from './ProductCard.styled'

export default function ProductCard({title, price, description, imageSrc, location, date}) {
  return (
    <StyledCard>
    <StyledImage src={imageSrc}></StyledImage>
    <StyledInfo>
      <h3>{title}</h3>
      {/* <p>posted on {date}</p> */}
      <h4>{price} €</h4> 
      <p>{location}</p>
      {/* <p>{description}</p> */}
    </StyledInfo>
    </StyledCard>
  )
}
