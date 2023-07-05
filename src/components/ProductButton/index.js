import React from 'react'
import { useRouter } from 'next/router';
import useSWRMutation from "swr/mutation"
import { useSession } from 'next-auth/react';
import { StyledButton } from '../StyledButton/StyledButton.styled';

export default function ProductButton({buttonText}) {
    const router= useRouter();
    const { query:{ id } ,push} = router;
    const { data: session } = useSession()

    async function handleClick(){

        if(buttonText === "Delete"){
        await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              "userId": session.user.id,
            }
          });
          push("/");
        }

        // if(buttonText === "Edit"){

        // }
    }
 

  return (
    <StyledButton style={{"width": "70px"}} onClick={handleClick}>{buttonText}</StyledButton>
  )
}
