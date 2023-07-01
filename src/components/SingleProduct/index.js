import React from 'react'
import { useRouter } from 'next/router';
import useSWR from "swr"
import ProductCard from '../ProductCard'
import MyMap from '../MyMap';
import ProductButton from '../ProductButton';

export default function SingleProduct() {
  const router= useRouter();
  const {id}= router.query;


  const { data: product } = useSWR(id ? `/api/products/${id}`: null)
 
  if (!product) {
    return <h1>Loading...</h1>;
  }


  return (
    <>
    <ProductCard title={product.name} price={product.price} description={product.description} imageSrc={product.image} date={product.date} location={product.location} />
    <MyMap coordinates={product.coordinates} />
    <ProductButton buttonText="Edit" />
    <ProductButton buttonText="Delete" />
    </>
  )
}
