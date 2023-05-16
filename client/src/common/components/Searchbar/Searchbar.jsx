import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { searchDogsByName } from "../../redux/actions";
import Input from "../Input/Input";
import s from "./Searchbar.module.css";

export default function Searchbar() {
  const [searchInputData, setSearchInputData] = useState("");
  const dispatch = useDispatch();
  let navigate = useHistory();

  const handleChange = (e) => {
    const textToSearch = e.target.value.replace(/[^a-zA-ZÀ-ú\s]+/g, "");
    setSearchInputData(textToSearch);
    dispatch(searchDogsByName(textToSearch.trim()));
    if (!textToSearch || navigate.location.pathname === "/dogs") return;
    navigate.push("/dogs");
  };

  return (
    <Input 
    className={s.input} 
    type="search" 
    name="SearchDog" 
    placeholder="Search Dog" 
    value={searchInputData} 
    onChange={handleChange} 
    onKeyPress={(e) => e.key === "Enter" && handleChange(e)}
    />
  );
}