import '@/styles/globals.css'
import { SWRConfig } from "swr";
import NavBar from '@/components/NavBar';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    <NavBar />
    </SWRConfig>
)}
