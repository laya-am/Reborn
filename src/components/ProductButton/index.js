import React from 'react'
import { useRouter } from 'next/router';
import useSWRMutation from "swr/mutation"

export default function ProductButton({buttonText}) {
    const router= useRouter();
    const { query:{ id } ,push} = router;
    // const { trigger, isMutating } = useSWRMutation(`/api/users/${id}`,updateUser);

    async function handleClick(){

        if(buttonText === "Delete"){
        await fetch(`/api/products/${id}`, {
            method: "DELETE",
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
