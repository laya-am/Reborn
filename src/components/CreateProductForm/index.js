import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { StyledForm, StyledDiv, StyledInput, StyledSelect, StyledTextArea } from "../StyledForm/StyledForm.styled";
import { StyledButton } from "../StyledButton/StyledButton.styled";
import styled from "styled-components";

const StyledPleaseLoginDiv= styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  justify-content: center;
  gap: 40px;
  `

export default function CreateProductForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const products = useSWR("/api/products");
  const { data: session } = useSession();
  const id = session?.user.id;

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleString("en-GB", options);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);
    console.log("productData.location", productData.location);
    const completeProductData = { ...productData, date, image: url };

    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${productData.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
    const coorResponse = await fetch(mapUrl);
    const data = await coorResponse.json();
    const coordinates = data?.features[0]?.center;
    console.log("coordinates: ", coordinates);

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        ...completeProductData,
        coordinates: [{ longitude: coordinates[0], latitude: coordinates[1] }],
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`There was an error: ${response.status}`);
    } else {
      products.mutate();
      router.push("/");
    }
  }
  if (session) {
    return (
      <StyledForm onSubmit={handleSubmit}>
        <StyledDiv>
          <label htmlFor="title">Title:</label>
          <StyledInput id="title" name="name" required />
        </StyledDiv>
        <StyledDiv>
          <label htmlFor="price">Price:</label>
          <div>
          <StyledInput type="number" id="price" name="price" required />
          <span style={{"margin-left": "10px"}}>EUR</span>
          </div>
        </StyledDiv>
        <StyledDiv>
          <label htmlFor="location">Choose a Neighborhood:</label>
          <StyledSelect name="location" id="location">
            <option value="">-------</option>
            <option value="charlottenburg">Charlottenburg</option>
            <option value="kreuzberg">Kreuzberg</option>
            <option value="marzahn">Marzahn</option>
            <option value="mitte">Mitte</option>
            <option value="neukölln">Neukölln</option>
            <option value="pankow">Pankow</option>
            <option value="stegliz">Stegliz</option>
            <option value="treptow">Treptow</option>
          </StyledSelect>
        </StyledDiv>
        <StyledDiv>
          <label htmlFor="description">Share the details:</label>
          <StyledTextArea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="How old or new is your product? Are there any signs of wear and tear? any defects?"
          ></StyledTextArea>
        </StyledDiv>
        <ImageUpload setUrl={setUrl} />
        <StyledButton type="submit">Add Product</StyledButton>
      </StyledForm>
    );
  }
  return (
    <StyledPleaseLoginDiv>
      <h1>Please Login</h1>
      <Link href="/sign-up">
        <StyledButton>Login</StyledButton>
      </Link>
    </StyledPleaseLoginDiv>
  );
}
