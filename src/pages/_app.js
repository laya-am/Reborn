import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { SWRConfig } from "swr";
import NavBar from '@/components/NavBar';
import {SessionProvider} from "next-auth/react"
import Script from 'next/script';

const inter = Inter({
  weight: ['200', '300', '400', '500', '600' , '700'],
  subsets: ['latin'],
})
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <>
    <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    <Script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js' />
    <SessionProvider session={session}>
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    <NavBar />
    </SWRConfig>
    </SessionProvider>
    </>
)}
