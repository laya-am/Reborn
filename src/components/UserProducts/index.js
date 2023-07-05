import { StyledUl, StyledLi, StyledImage, StyledInfo } from "./UserProducts.styled";

export default function UserProducts({ products }) {
  return (
    <div>
      <h3>Your Products</h3>
      <hr />
      <StyledUl>
        {products.map((product) => (
          <StyledLi key={product._id}>
            <StyledImage src={product.image} alt="product" />
            <StyledInfo>
              <h4>{product.name}</h4>
              <p>{product.price} €</p>
              <p>added on {product.date}</p>
            </StyledInfo>
          </StyledLi>
        ))}
      </StyledUl>
    </div>
  );
}
