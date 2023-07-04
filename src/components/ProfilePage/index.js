import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import UserProducts from "../UserProducts";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { StyledButton } from "../StyledButton/StyledButton.styled";
import { StyledImage, StyledDiv } from "./ProfilePage.styled";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user.id;

  function handleSignOut() {
    signOut();
    if (!user) {
      router.push("/");
    }
  }

  const { data: user } = useSWR(id ? `/api/users/${id}` : null);
  if (!user) {
    return <StyledDiv style={{"height":"100vh", "justifyContent": "center"}}><h3>Loading...</h3></StyledDiv>;
  }
  if (session) {
    return (
      <StyledDiv>
        <StyledImage src={user.image} alt={`${user.name}'s profile picture`} />
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <p>{user.bio}</p>
        {user.products.length > 0 && <UserProducts products={user.products} />}
        <div>
          <StyledButton onClick={handleSignOut}>Sign out</StyledButton>
          <Link href={`/edit-profile/${id}`}>
            <StyledButton>Edit Profile</StyledButton>
          </Link>
        </div>
      </StyledDiv>
    );
  }
}
