import styled from "styled-components";

export const StyledDiv= styled.div`
display: flex;
justify-content: space-around;
padding: 10px;
align-items: center;
`

export const StyledImage= styled.img`
width: 60px;
border-radius: 50%;
&:hover{
    box-shadow: 10px 5px 5px lightgrey;
    cursor: pointer;
}
`