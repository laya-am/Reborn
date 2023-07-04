import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import ImageUpload from "../ImageUpload";
import { useSession } from "next-auth/react";
import { StyledButton } from "../StyledButton/StyledButton.styled";
import { StyledDiv, StyledInput, StyledTextArea, StyledForm } from "../StyledForm/StyledForm.styled";

export default function UserForm({
  buttonText,
  prevName,
  prevEmail,
  prevLocation,
  prevBio,
}) {
  const {data: session} = useSession();
  const users = useSWR("/api/users");
  const router = useRouter();
  const { push } = router;
  const { id } = router.query;
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${id}`,
    updateUser
  );

  const [name, setName] = useState(prevName);
  const [email, setEmail] = useState(prevEmail);
  const [location, setLocation] = useState(prevLocation);
  const [bio, setBio] = useState(prevBio);

  const [url, setUrl] = useState("");

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

  const { data: allUsers } = useSWR("/api/users");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    const doesTheUserAlreadyExist = await allUsers.some(
      (user) => user._id === id
    );
    if (doesTheUserAlreadyExist) {
      await trigger(userData);
    } else {
      const completeData = { ...userData, image: url };
      console.log("completeData", completeData);
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(completeData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`There was an error: ${response.status}`);
      } else {
        users.mutate();
      }
    }
    push(`/profile-page`);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
    <StyledDiv>
      <label htmlFor="name">Name:</label>
      <StyledInput
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      </StyledDiv>
      <StyledDiv>
      <label htmlFor="email">Email Address:</label>
      <StyledInput
        type="email"
        id="email"
        name="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </StyledDiv>
      {!session &&
      <StyledDiv>
      <label htmlFor="password">Password:</label>
      <StyledInput
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
        required
      />
      </StyledDiv>}
      <ImageUpload setUrl={setUrl} />
      <StyledDiv>
      <label htmlFor="bio">Bio:</label>
      <StyledTextArea
        name="bio"
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Share a little about yourself. This helps the other users to connect with you more easily."
      ></StyledTextArea>
      </StyledDiv>
      <StyledButton type="submit">{buttonText}</StyledButton>
    </StyledForm>
  );
}
