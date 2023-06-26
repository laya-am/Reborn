import '@/styles/globals.css'
import { SWRConfig } from "swr";
import NavBar from '@/components/NavBar';
import {SessionProvider} from "next-auth/react"

// import { GoogleOAuthProvider } from '@react-oauth/google';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    <NavBar />
    </SWRConfig>
    </SessionProvider>
)}
