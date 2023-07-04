import Login from "@/components/Login";
import UserForm from "@/components/UserForm";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledContainer = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
margin: 30px
`;

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
align-content: center;
`;


export default function SignUp() {
  const router = useRouter();
  const { push } = router;
  const { data: session } = useSession();

  if (!session) {
    return (
      <StyledContainer>
      <StyledDiv>
          <h3  style={{"padding-bottom":20}}>Already have an account? Log in:</h3>
          <Login />
        </StyledDiv>
        <hr />
        <StyledDiv>
          <h2>New here? Create an account:</h2>
          <UserForm buttonText="Sign Up" />
        </StyledDiv>
      </StyledContainer>
    );
  }
  push("/");
}
