import Head from 'next/head'
import ProductsList from '@/components/ProductsList'
import React, { useState } from 'react'
import TopNavBar from '@/components/TopNavBar'

export default function Home() {
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
        <TopNavBar setQuery={setQuery} query={query} />
        <ProductsList query={query} />
      </main>
    </>
  )
}
