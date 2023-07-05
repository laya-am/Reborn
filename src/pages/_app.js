import '@/styles/globals.css'
import { SWRConfig } from "swr";
import NavBar from '@/components/NavBar';
import {SessionProvider} from "next-auth/react"
import Script from 'next/script';
import Head from 'next/head';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <>
    {/* <Head><link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
    </Head> */}

    <Script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js' />
    <SessionProvider session={session}>
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    <NavBar />
    </SWRConfig>
    </SessionProvider>
    </>
)}
