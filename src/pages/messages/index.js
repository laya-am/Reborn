import Messages from '@/components/Messages';
import styled from 'styled-components';

const StyledDiv= styled.div`
display: flex;
flex-direction: column;
 justify-content: flex-end;
 height: 100vh;

`
export default function messages() {
 return (
 <StyledDiv>
 <Messages />
 </StyledDiv>
 )
}