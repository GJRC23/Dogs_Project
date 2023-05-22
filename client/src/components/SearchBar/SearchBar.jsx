import './SearchBar.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

export default function SearchBar() {

   const dispatch = useDispatch();
   const [dog, setDog] = useState("");

   const handleChange = (event) => {
      setDog(event.target.value)
   }
   const handleSubmit = (dog) => {
       dispatch(getByName(dog))
   }

   return (
      <div className='searchBar'>
         <input id="input-search" type='search' value={dog} placeholder='Search by Name' onChange={handleChange} />
         <button className='agregarBtn' type='submit' onClick={() => { handleSubmit(dog); setDog('') }}> Search Dog </button>
      </div>
   );
}