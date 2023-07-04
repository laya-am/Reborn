import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import MyMap from "../MyMap";
import ProductButton from "../ProductButton";
import { useSession } from "next-auth/react";
import { StyledImage, StyledDiv } from "./SingleProduct.styled";
import { StyledButton } from "../StyledButton/StyledButton.styled";

export default function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { data: product } = useSWR(id ? `/api/products/${id}` : null);

  const sellerId = product?.userId;
  const buyerId = session?.user.id;

  console.log({ sellerId });
  console.log({ buyerId });

  let isSellerViewingThePage = false;
  sellerId === buyerId ? (isSellerViewingThePage = true) : null;

  if (!product) {
    return <StyledDiv style={{"height":"100vh", "justifyContent": "center", "alignItems": "center"}}><h3>Loading...</h3></StyledDiv>;
  }

  async function handleClick() {
    const response = await fetch(`/api/users/${buyerId}`, {
      method: "POST",
      body: JSON.stringify({ sellerId, buyerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(`There was an error: ${response.status}`);
    }
  }

  return (
    <>
      <StyledImage src={product.image} alt="product image" />
      <StyledDiv>
        <h1>{product.name}</h1>
        <hr />
        <h2>{product.price} €</h2>
        <p>posted on {product.date}</p>
        <hr />
        <p>{product.description}</p>
        <hr />
        <p>{product.location}</p>
        <MyMap coordinates={product.coordinates} />
      {isSellerViewingThePage ? (
        <div style={{"display":"flex", "justifyContent": "flex-start"}}>
        <Link href={`/edit-product/${id}`}><ProductButton buttonText="Edit" /></Link>
         <ProductButton buttonText="Delete" />
        </div>
      ) : (
        <Link href={{ pathname: "/messages", query: { userId1: sellerId } }}>
        <StyledButton onClick={handleClick}> Message the Seller
        </StyledButton>
        </Link>
      )}
      </StyledDiv>
    </>
  );
}
