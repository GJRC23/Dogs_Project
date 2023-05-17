import './SearchBar.css';
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
   const [name, setName] = useState('');

   const handleChange = (event) => {
      setName(event.target.value);
   };

   const handleSearch = () => {
      onSearch(name);
      setName('');
   };

   return (
      <div className='searchBar'>
         <input id="input-search" type='search' placeholder='Search by Name' onChange={handleChange} value={name} />
         <button className='agregarBtn' onClick={handleSearch}> Search Dog </button>
      </div>
   );
}