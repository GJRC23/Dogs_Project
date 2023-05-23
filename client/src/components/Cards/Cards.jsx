import './Cards.css';
import Card from '../Card/Card.jsx';
import Pagination from '../Pagination/Pagination.jsx';

import { setPage } from '../../redux/actions';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Cards = () => {
  const { allDogs, page } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePagination = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  let desde = (page - 1) * 8 + 1; // Ajustar el inicio del rango de tarjetas
  let hasta = page * 8;

  const dogs = allDogs?.slice(desde - 1, hasta); // Ajustar los límites del slice

  return (
    <div className="cards">
      {
        dogs && dogs.map(({ id, name, weight, height, temperaments, temperament, origin, image, createInDb }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              weight={weight}
              height={height}
              temperaments={temperaments}
              temperament={temperament}
              origin={origin}
              image={image}
              createInDb={createInDb}
            />
          );
        })
      }
      <Pagination
        currentPage={page} // Pasa el número de página actual
        dogsPerPage={8} // Define la cantidad de perros por página
        dogs={allDogs.length} // Pasa la cantidad total de perros
        pagination={handlePagination} // Define la función de paginación
      />
    </div>
  );
}

export default Cards;