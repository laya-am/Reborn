import React from 'react'
import { useRouter } from 'next/router';
import useSWR from "swr"
import CreateProductForm from '@/components/CreateProductForm'

export default function EditProduct() {
  const router= useRouter();
  const {id}= router.query;

    const { data: product, error, isLoading } = useSWR(id ? `/api/products/${id}`: null)
    if(!product) return <h1>Loading...</h1>
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(product);

  return (
    <CreateProductForm prevName={product.name} prevDescription={product.description} prevPrice={product.price} prevLocation={product.location}/>
  )
}
