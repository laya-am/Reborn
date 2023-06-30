import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from "swr"
import ImageUpload from '@/components/ImageUpload'

const StyledForm= styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center
`

export default function CreateProductForm() {
    const [url, setUrl] = useState("");
    // const [neighborhood, setNeighborhood] = useState("");

    const products = useSWR("/api/products");
    const router = useRouter();
    const {push} = router;
    const {id}= router.query;

    const today = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date= today.toLocaleString("en-GB", options);


    async function handleSubmit(e){
        e.preventDefault();
        const formData= new FormData(e.target);
        const productData= Object.fromEntries(formData);
        console.log("productData.location",productData.location);
        const completeProductData= {...productData, date, image: url};

        const mapUrl= `https://api.mapbox.com/geocoding/v5/mapbox.places/${productData.location}.json?access_token=pk.eyJ1IjoibGF5YS1hbSIsImEiOiJjbGppY3podDcwZTM5M2Rwd2ZzcjhncXlqIn0.UTrjgvRym9VScITGfCUAGw`
                // try {
                    const coorResponse = await fetch(mapUrl);
                    // if (coorResponse.ok) {
                        const data = await coorResponse.json();
                        const coordinates= data?.features[0]?.center;
                        console.log("coordinates: ",coordinates);
                    // }
                //     } else {
                //         console.error("Bad Response");
                //     }
                // } catch (error) {
                //     console.error("An Error occurred");
                // }


        const response = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({...completeProductData, coordinates: coordinates, userId:id}),
            headers: {
              "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            console.error(`There was an error: ${response.status}`)
        }else{
            products.mutate();
            push("/");
        }
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input id="title" name='name' required/>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name='price' required /><span>EUR</span>
        <label htmlFor="location">Choose a Neighborhood:</label>
        <select name="location" id="location">
            <option value="charlottenburg">Charlottenburg</option>
            <option value="kreuzberg">Kreuzberg</option>
            <option value="marzahn">Marzahn</option>
            <option value="mitte">Mitte</option>
            <option value="neukölln">Neukölln</option>
            <option value="pankow">Pankow</option>
            <option value="stegliz">Stegliz</option>
            <option value="treptow">Treptow</option>
        </select>
        <label htmlFor="description">Share the details:</label>
        <textarea name="description" id="description" cols="30" rows="10" placeholder='How old or new is your product? Are there any signs of wear and tear? any defects? '></textarea>
        <ImageUpload setUrl={setUrl} />
        <button type="submit">Add Product</button>
    </StyledForm>
  )
}
