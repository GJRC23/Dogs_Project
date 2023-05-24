import './Home.css';

import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps, filterBreedsByTemperament, getByOrigin, orderCardsByName, orderCardsByWeight } from "../../redux/actions";


const Home = () => {
  
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const tempState = useSelector((state) => state.temperaments);
  
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogs());
  };

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemps())
}, [dispatch]);
  
const handleOrderByName = (event) => {
    event.preventDefault();
    dispatch(orderCardsByName(event.target.value));
};
  
  const handleWeightOrder = (event) => {
    event.preventDefault();
    dispatch(orderCardsByWeight(event.target.value));
  };
  
  const handleFilterByTemps = (event) => {
    event.preventDefault();
    dispatch(filterBreedsByTemperament(event.target.value));
  };
  
  const handleOrigin = (event) => {
    event.preventDefault();
    dispatch(getByOrigin(event.target.value));
  };

  return (
    <div className="home-page">
      
      <Nav/>

      <div className='filters'>
        <button className="loadBtn" onClick={(event) => handleClick(event)}>
        <img className='loadLogo' src="https://cdn-icons-png.flaticon.com/512/776/776862.png" alt="" />
        Reload
        Dogs
        </button>

        <select className='select' onChange={(event) => handleOrderByName(event)} defaultValue="Name">
          <option value="Asc">A-Z</option>
          <option value="Dec">Z-A</option>
        </select>

        <select className="select" onChange={(event) => handleWeightOrder(event)} defaultValue="Weight">
          <option value="">All Weights</option>
          <option value="max">Weight Max-Min</option>
          <option value="min">Weight Min-Max</option>
        </select>

        <select className='select' onChange={(event) => handleFilterByTemps(event)} defaultValue="Temperaments">
          <option value="All">All Temperaments</option>
          {tempState?.map((temperaments) => (
            <option key={temperaments} value={temperaments}>{temperaments}</option> ))
          }
        </select>

        <select className='select' onChange={(event) => handleOrigin(event)} defaultValue="Dogs">
          <option value="">All Origins</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
      </div>

      <Cards dogs={allDogs}/>

    </div>
  );
};

export default Home;
