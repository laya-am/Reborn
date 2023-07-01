import dynamic from 'next/dynamic'

const Chat = dynamic(() => import('../../components/Chat'), { ssr: false });

export default function messages() {
  return (
    <>
    <h1>your messages here</h1>
    <Chat />
    </>
  )
}
