import '@/styles/globals.css'
import { SWRConfig } from "swr";
import NavBar from '@/components/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="145185057177-mq3m2e494rgukk41os9b9l60gbgp2o5h.apps.googleusercontent.com">
    <SWRConfig value={{ fetcher }}>
    <Component {...pageProps} />
    <NavBar />
    </SWRConfig>
    </GoogleOAuthProvider>
)}
