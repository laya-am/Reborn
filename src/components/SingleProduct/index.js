import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import MyMap from "../MyMap";
import ProductButton from "../ProductButton";
import { useSession } from "next-auth/react";
import { StyledImage, StyledDiv } from "./SingleProduct.styled";
import { StyledButton } from "../Button/Button.styled";

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
    return <h1>Loading...</h1>;
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
        <div style={{"display":"flex", "justify-content": "flex-start"}}>
          <ProductButton buttonText="Edit" />
          <ProductButton buttonText="Delete" />
        </div>
      ) : (
        <StyledButton onClick={handleClick}> Message the Seller
        <Link href={{ pathname: "/messages", query: { userId1: sellerId } }}></Link>
        </StyledButton>
      )}
      </StyledDiv>
    </>
  );
}
