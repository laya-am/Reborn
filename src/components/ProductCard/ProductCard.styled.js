import styled from "styled-components"

export const StyledCard= styled.div`
border-radius: 20px;
background-color: rgb(250,250,250);
display: flex;
flex-direction: column;
box-sizing: border-box;
width: 40vw;
height: 28vh;
box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.12);
`

export const StyledImage= styled.img`
border-radius: 20px 20px 0 0;
height: 15vh;

object-fit: cover;
`

export const StyledInfo= styled.div`
${'' /* display: flex;
flex-wrap: wrap; */}
padding: 12px;
`
export const StyledLine= styled.div`
height: 5px;
background-color: #4F709C
`