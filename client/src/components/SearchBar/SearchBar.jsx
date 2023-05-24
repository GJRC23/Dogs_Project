import './SearchBar.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [dog, setDog] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setDog(event.target.value);
  };

  const handleSearch = async () => {
    const search = dog.trim().toLowerCase();
    if (!search) {
      setError("Please enter a name");
      return;
    } else if (!search.match(/^[a-zA-Z\s]+$/)) {
      setError("Please enter alphabetic characters");
      return;
    }

    try {
      const response = await dispatch(getByName(search));

      if (response.length === 0) {
        setError("No name was found");
      } else {
        setError("");
      }
    } catch (error) {
      setError("An error occurred while searching");
    }
  };

  return (
    <div className="searchBar">
      <input className="input-search" type="search" value={dog} placeholder="Search by Name" onChange={handleChange}/>
      <button className="agregarBtn" type="submit" onClick={handleSearch}>Search Dog</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}