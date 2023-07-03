import React from 'react'
import { useRouter } from 'next/router';
import useSWRMutation from "swr/mutation"
import { useSession } from 'next-auth/react';

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

        if(buttonText === "Edit"){

        }
    }
 

  return (
    <button onClick={handleClick}>{buttonText}</button>
  )
}
