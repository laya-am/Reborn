import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
const Chat = dynamic(() => import('../../components/Chat'), { ssr: false });

export default function Messages() {
    const router = useRouter();
    // console.log(router.query);
    const userId1= router.query.userId1;
    const userId2= router.query.userId2;
    // console.log("Messages1", userId1);
    // console.log("Messages2",userId2);

    return (
        <>
        <h1>your messages here</h1>
        <Chat userId1={userId1} userId2={userId2} />
        </>
        )
}
