import Head from 'next/head'
import ProductsList from '@/components/ProductsList'
import SearchBar from '@/components/Search'
import Login from '@/components/Login'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import ImageUpload from '@/components/ImageUpload'

export default function Home() {
  const { data: session } = useSession()

  const [query, setQuery] = useState("");

  return (
    <>
      <Head>
        <title>Reborn</title>
        <meta name="description" content="A marketplace to buy and sell secondhand goods" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      {session && <Login />}
      <ImageUpload />
        <SearchBar setQuery={setQuery} query={query} />
        <ProductsList query={query} />
      </main>
    </>
  )
}
