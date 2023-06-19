import '@/styles/globals.css'
import { SWRConfig } from "swr";


const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    </SWRConfig>
)}
