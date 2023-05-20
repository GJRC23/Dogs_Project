import './Home.css';

import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import Paginate from '../Paginate/Paginate.jsx';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps, filterBreedsByTemperament, getByOrigin, orderCards, orderCardsByWeight} from "../../redux/actions";


const Home = () => {
  
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs);
  const temperaments = useSelector(state => state.temperaments);
  const temperamentsArray = Array.isArray(temperaments) ? temperaments : [];
  
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
  
  const handleOrigin = (event) => {
    dispatch(getByOrigin(event.target.value));
}
  
  useEffect(() => {

    dispatch(getDogs())
    dispatch(getTemps())

}, []);

  return (
    <div className="home-page">
      <Nav />

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
          {temperamentsArray.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option> ))
          }
        </select>

        <select className='select' onChange={handleOrigin}>
          <option value="">All Origins</option>
          <option value="API">API</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <Cards allDogs={allDogs}/>

      <div className="pagiCont">
        <Paginate />
      </div>

    </div>
  );
};

export default Home;
