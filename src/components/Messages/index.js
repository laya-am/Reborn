import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const Chat = dynamic(() => import('../../components/Chat'), { ssr: false });

export default function Messages() {
    const router = useRouter();
    const { data: session } = useSession();
    const [sellerId, setSellerId] = useState(router.query.userId1);
    const currentId = session?.user.id;
    const [isLoading, setIsLoading] = useState(true);

    
    async function fetchChatPartnersFromDB() {
      const response = await fetch(`/api/users/${currentId}`);
      const user = await response.json();
      const partnerId = user.chatPartners[0];
      return partnerId;
    }
  
    useEffect(() => {
      async function updateSellerId() {
        const newSellerId = await fetchChatPartnersFromDB();
        setSellerId(newSellerId);
        setIsLoading(false);
      }
      if (!sellerId) {
        updateSellerId();
      }
    }, [sellerId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
  
    return (
      <>
        <h1>Your messages here</h1>
        <Chat userId1={sellerId} userId2={currentId} />
      </>
    );
  }
  
