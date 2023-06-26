import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import useSWR from "swr"
import useSWRMutation from "swr/mutation"

const StyledForm= styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center
`

export default function UserForm({buttonText, prevName, prevEmail, prevLocation, prevBio}) {
    const users = useSWR("/api/users");
    const router = useRouter();
    const { push } = router;
    const { id } = router.query;
    const { trigger, isMutating } = useSWRMutation(`/api/users/${id}`,updateUser);

    const [name, setName] = useState(prevName)
    const [email, setEmail] = useState(prevEmail)
    const [location, setLocation] = useState(prevLocation)
    const [bio, setBio] = useState(prevBio)
    // if(isMutating){
    //     return null
    // }
    async function updateUser(url, { arg }) {
        const response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify(arg),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          await response.json();
        } else {
          console.error(`Error: ${response.status}`);
        }
      }

      const { data: allUsers } = useSWR('/api/users')

      async function handleSubmit(e){
          e.preventDefault();
          const formData= new FormData(e.target);
          const userData= Object.fromEntries(formData);
          const doesTheUserAlreadyExist = await allUsers.some(user => user._id === id)
        if(doesTheUserAlreadyExist){
            await trigger(userData);
        }else{
        const response = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
        });

      }
  
  push(`/`);
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" name='name' value={name} onChange={e=> setName(e.target.value)} required/>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name='email' autoComplete='username' value={email} onChange={e=> setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password' autoComplete='current-password' required />
        <label htmlFor="location">Location:</label>
        <input id="location" name='location' value={location} onChange={e=> setLocation(e.target.value)} required />
        <label htmlFor="profilePicture">Upload a Profile Picture:</label>
        <input id="profilePicture" name='profilePicture' />
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" id="bio" value={bio} onChange={e=> setBio(e.target.value)} cols="30" rows="10" placeholder='Share a little about yourself. This helps the other users to connect with you more easily.'></textarea>
        <button type="submit">{buttonText}</button>
    </StyledForm>
    )
}
