import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components'
import useSWR from "swr"

const StyledForm= styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center
`

export default function SignUpForm() {
    const users = useSWR("/api/users");
    const router = useRouter();
    const {push} = router;

    async function handleSubmit(e){
        e.preventDefault();
        const formData= new FormData(e.target);
        const userData= Object.fromEntries(formData);
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            console.error(`There was an error: ${response.status}`)
        }else{
            users.mutate();
            push("/");
        }
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" name='name' required/>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name='email' autoComplete='username' required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password' autoComplete='current-password' required />
        <label htmlFor="location">Location:</label>
        <input id="location" name='location' required />
        <label htmlFor="profilePicture">Upload a Profile Picture:</label>
        <input id="profilePicture" name='profilePicture' />
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" id="bio" cols="30" rows="10" placeholder='Share a little about yourself. This helps the other users to connect with you more easily.'></textarea>
        <button type="submit">Sign Up</button>
    </StyledForm>
    )
}
