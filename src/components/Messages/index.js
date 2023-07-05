import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { StyledDiv, StyledHeader } from './Messages.styled';
const Chat = dynamic(() => import('../../components/Chat'), { ssr: false });

export default function Messages() {
    const router = useRouter();
    const { data: session } = useSession();
    const [sellerId, setSellerId] = useState(router.query.userId1);
    const currentId = session?.user.id;
    const [isLoading, setIsLoading] = useState(!sellerId);

    // console.log("I'm inside messages, sellerId: ", sellerId);
    // console.log("I'm inside messages, currentId: ", currentId);
    
    async function fetchChatPartnersFromDB() {
      const response = await fetch(`/api/users/${currentId}`);
      const user = await response.json();
      const partnerId = user.chatPartners[0];
      return partnerId;
    }
  


    // async function fetchPartnerInfo() {
    //   const response = await fetch(`/api/users/${sellerId}`);
    //   const partnerInfo = await response.json();
    //   return partnerInfo;
    // }


    useEffect(() => {
      async function updateSellerId() {
        const newSellerId = await fetchChatPartnersFromDB();
        setSellerId(newSellerId);
        // const partner= await fetchPartnerInfo();
        // console.log({partner});
        setIsLoading(false);
      }
      setIsLoading(false);
      if (!sellerId) {
        // console.log("inside useEffect if");
        updateSellerId();
      }
    }, [sellerId]);


    if (isLoading) {
      return <StyledDiv style={{"height":"100vh", "justifyContent": "center", "alignItems": "center"}}><h3>Loading...</h3></StyledDiv>;
    }
  
    return (
      <StyledDiv>
        <StyledHeader>Your messages</StyledHeader>
        <Chat userId1={sellerId} userId2={currentId} />
      </StyledDiv>
    );
  }
  
