import React from 'react'
import styled from 'styled-components';

const StyledInput= styled.input`
  width: 60vw;
  height: 30px;
  border-radius: 10px;
  padding: 10px
`

export default function SearchBar({setQuery, query}) {
    async function handleSubmit(e){
        e.preventDefault();
        e.target.reset();
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <StyledInput type="text" name='query' onChange={e => setQuery(e.target.value)} placeholder='🔎 search the market' />
    </form>
    {query && <p>You searched for: {query}</p>}
    </div>
  )
}
