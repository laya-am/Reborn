import React from 'react'

export default function SearchBar({setQuery, query}) {


    async function handleSubmit(e){
        e.preventDefault();
        e.target.reset();
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" name='query' onChange={e => setQuery(e.target.value)} placeholder='search the market' />
    </form>
    {query && <h3>You searched for: {query}</h3>}
    </div>
  )
}
