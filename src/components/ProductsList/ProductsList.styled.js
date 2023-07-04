import styled from "styled-components";

export const StyledButton = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  } 
`

export const StyledDiv= styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 30px;
    gap: 30px;
    height: 100%;
    overflow: auto
`