import Head from 'next/head'
import ProductsList from '@/components/ProductsList'


export default function Home() {
  return (
    <>
      <Head>
        <title>Reborn</title>
        <meta name="description" content="A marketplace to buy and sell secondhand goods" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProductsList />
      </main>
    </>
  )
}
