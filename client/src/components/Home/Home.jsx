import './Home.css';
import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dogs');
      const data = response.data;

      console.log(data); // Agrega esta línea para verificar los datos

      if (data.length > 0) {
        setDogs(data);
      } else {
        alert('¡No hay perros disponibles!');
      }
    } catch (error) {
      alert('Error al obtener los datos de los perros');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const onSearch = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      const data = response.data;
  
      console.log(data); // Agrego esta línea para verificar los datos
  
      if (data.length > 0) {
        setDogs(data);
      } else {
        alert('¡No hay perros con este nombre!');
      }
    } catch (error) {
      alert('Error al obtener los datos de los perros');
      console.error(error);
    }
  };

    return(
        <div className="home-page">
                  <Nav onSearch={onSearch}/>
                  <Cards dogs={dogs}/>
        </div>
    )
}

export default Home;