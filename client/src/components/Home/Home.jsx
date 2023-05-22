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
  
  const handleOrder = (event) => {
    const selectedOrder = event.target.value === "A" ? "A" : "D";
    dispatch(orderCards(selectedOrder));
  };
  
  const handleWeightOrder = (event) => {
    const selectedOrder = event.target.value === "A" ? "A" : "D";
    dispatch(orderCardsByWeight(selectedOrder));
  };
  
  const handleFilter = (event) => {
    const selectedTemperament = event.target.value;
    dispatch(filterBreedsByTemperament(selectedTemperament));
  };
  
  const handleOrigin = (event) => {
    dispatch(getByOrigin(event));
}

  useEffect(() => {

    dispatch(getDogs())
    dispatch(getTemps())

}, [dispatch]);

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
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>

        <select className='select' onChange={handleFilter}>
          <option value="">All Temperaments</option>
          {temperaments.map((temperaments) => (
            <option key={temperaments.id} value={temperaments.name}>
              {temperaments.name}
            </option> ))
          }
        </select>

        <select className='select' onChange={(event) => handleOrigin(event.target.value)}>
          <option value="ALL">All Origins</option>
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
