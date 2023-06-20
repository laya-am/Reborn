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
    function handleSubmit(e){
        e.preventDefault();
        const formData= new FormData(e.target);
        const userData= Object.fromEntries(formData);
        console.log(userData);
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
        <input type="location" id="location" name='location' required />
        <label htmlFor="profile-pic">Upload a Profile Picture:</label>
        <input type="profile-pic" id="profile-pic" name='profile-pic' />
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" id="bio" cols="30" rows="10" placeholder='Share a little about yourself. This helps the other users to connect with you more easily.'></textarea>
        <button type="submit">Sign Up</button>
    </StyledForm>
    )
}
