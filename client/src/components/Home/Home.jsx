import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps, filterBreedsByTemperament, getByOrigin, orderCards, orderCardsByWeight, setTemperaments } from "../../redux/actions";
import axios from 'axios';
import './Home.css';
import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import Paginate from '../Paginate/Paginate.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);
  const myDogs = useSelector(state => state.myDogs);
  const [dogs, setDogs] = useState([]);
  const [aux, setAux] = useState(false);

  const onSearch = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      const data = response.data;

      if (data.length > 0) {
        setDogs(data);
        dispatch(filterBreedsByTemperament('')); // Restaurar todas las razas al buscar
      } else {
        alert('¡No hay perros con este nombre!');
      }
    } catch (error) {
      alert('Error al obtener los datos de los perros');
      console.error(error);
    }
  };

  useEffect(() => {

    dispatch(getDogs());
    dispatch(getTemps());

}, []);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };

  const handleWeightOrder = (event) => {
    dispatch(orderCardsByWeight(event.target.value));
  };

  const handleFilter = (event) => {
    const selectedTemperament = event.target.value;
    dispatch(filterBreedsByTemperament(selectedTemperament));
  };

  const handleOriginFilter = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(getByOrigin(selectedOrigin));
  };

  return (
    <div className="home-page">
      <Nav onSearch={onSearch} />
    <div className='filters'>
      <select className='select' onChange={handleOrder}>
        <option value="A">A-Z</option>
        <option value="D">Z-A</option>
      </select>

      <select className="select" onChange={handleWeightOrder}>
        <option value="">Sort by Weight</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select className='select' onChange={handleFilter}>
        <option value="">All Temperaments</option>
        {temperaments.map((temperament) => (
          <option key={temperament.id} value={temperament.name}>
            {temperament.name}
          </option>
        ))}
      </select>

      <select className='select' onChange={handleOriginFilter}>
        <option value="">All Origins</option>
        <option value="API">API</option>
        <option value="Database">Database</option>
      </select>
    </div>

      <Cards dogs={dogs} />
      <div className="pagiCont">
                <Paginate />
            </div>
    </div>
  );
};

export default Home;
