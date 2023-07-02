import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from "swr"
import ProductCard from '../ProductCard'
import MyMap from '../MyMap';
import ProductButton from '../ProductButton';
import { useSession } from 'next-auth/react';

export default function SingleProduct() {
  const router= useRouter();
  const {id}= router.query;
  const { data: session } = useSession();

  const { data: product } = useSWR(id ? `/api/products/${id}`: null)
  
  const sellerId= product?.userId;
  const buyerId= session?.user.id;
  // console.log("sellerId", sellerId);
  // console.log("buyerId", buyerId);

  let isSellerViewingThePage = false;
  sellerId === buyerId ? isSellerViewingThePage= true : null;
 
  console.log(isSellerViewingThePage);
  if (!product) {
    return <h1>Loading...</h1>;
  }

  async function handleClick(){
    const response = await fetch(`/api/users/${buyerId}`, {
      method: "POST",
      body: JSON.stringify({sellerId, buyerId}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok){
        console.error(`There was an error: ${response.status}`)
    }
  }

  return (
    <>
    <ProductCard title={product.name} price={product.price} description={product.description} imageSrc={product.image} date={product.date} location={product.location} />
    <MyMap coordinates={product.coordinates} />
    {/* {isSellerViewingThePage ? */}
    <>
    <ProductButton buttonText="Edit" />
    <ProductButton buttonText="Delete" />
    </>
    : <Link href={{ pathname: '/messages', query: { userId1: sellerId, userId2: buyerId },}}><button onClick={handleClick}> Message the Seller</button></Link>
    {/* } */}
    </>
  )
}
